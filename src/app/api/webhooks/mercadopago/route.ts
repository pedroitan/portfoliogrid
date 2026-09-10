import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { supabase } from '@/lib/supabase';
import { getPaymentStatus, getMerchantOrder } from '@/lib/mercadopago';
import { sendConfirmationEmail, sendAdminPaymentConfirmation } from '@/lib/email';

/**
 * Valida a assinatura do webhook conforme documentacao do Mercado Pago:
 * header x-signature = "ts=<timestamp>,v1=<hmac>"
 * manifest = "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
 */
function verifySignature(req: NextRequest, dataId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('[Webhook] MERCADOPAGO_WEBHOOK_SECRET nao configurado; assinatura nao validada.');
    return true;
  }

  const signature = req.headers.get('x-signature') ?? '';
  const requestId = req.headers.get('x-request-id') ?? '';
  const parts = Object.fromEntries(
    signature.split(',').map((p) => p.trim().split('=') as [string, string])
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const expected = createHmac('sha256', secret).update(manifest).digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const dataId: string | undefined =
      req.nextUrl.searchParams.get('data.id') ?? body?.data?.id?.toString();
    const type = body?.type ?? req.nextUrl.searchParams.get('type');

    if (!dataId || (type !== 'payment' && type !== 'merchant_order')) {
      return NextResponse.json({ ok: true });
    }

    if (!verifySignature(req, dataId)) {
      console.warn('[Webhook] Assinatura invalida para', type, dataId);
      return NextResponse.json({ error: 'Assinatura invalida.' }, { status: 401 });
    }

    let paymentStatus = '';
    let paymentId = '';
    let externalReference = '';

    if (type === 'payment') {
      const payment = await getPaymentStatus(dataId);
      paymentStatus = payment.status;
      paymentId = payment.id;
      externalReference = payment.external_reference;
    } else if (type === 'merchant_order') {
      const order = await getMerchantOrder(dataId);
      paymentId = order.payments[0]?.id ?? '';
      paymentStatus = order.payments[0]?.status ?? order.status ?? '';
      externalReference = order.external_reference;

      // Se a order informou o id do pagamento, busca o status mais recente
      if (paymentId) {
        try {
          const payment = await getPaymentStatus(paymentId);
          paymentStatus = payment.status || paymentStatus;
          externalReference = payment.external_reference || externalReference;
        } catch (err) {
          console.warn('[Webhook] Nao foi possivel buscar status do pagamento', paymentId, err);
        }
      }
    }

    if (!paymentStatus) {
      console.warn('[Webhook] Status de pagamento nao identificado', type, dataId);
      return NextResponse.json({ ok: true });
    }

    const wasApproved = paymentStatus === 'approved';

    let { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('mercado_pago_payment_id', paymentId || dataId)
      .maybeSingle();

    // Checkout Pro envia merchant_order/payment com external_reference = id da inscricao
    if (!enrollment && externalReference) {
      const { data } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', externalReference)
        .maybeSingle();
      enrollment = data;
    }

    if (!enrollment) {
      console.warn('[Webhook] Inscricao nao encontrada', type, dataId, paymentId, externalReference);
      return NextResponse.json({ ok: true });
    }

    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        payment_status: paymentStatus,
        confirmed: wasApproved,
        mercado_pago_payment_id: paymentId || enrollment.mercado_pago_payment_id,
      })
      .eq('id', enrollment.id);

    if (updateError) {
      console.error('[Webhook update error]', updateError);
      return NextResponse.json({ error: 'Update error' }, { status: 500 });
    }

    if (wasApproved && !enrollment.email_sent) {
      try {
        await sendConfirmationEmail({
          to: enrollment.email,
          name: enrollment.name,
          courseTitle: 'Oficina Producao Musical com IA',
          date: '19/09/2026',
          time: '14h as 17h',
          location: 'Docas · Studio do Forte · Salvador',
        });

        await sendAdminPaymentConfirmation({
          name: enrollment.name,
          email: enrollment.email,
          phone: enrollment.phone,
          cpf: enrollment.cpf,
          paymentId: paymentId || dataId,
          amount: enrollment.amount,
        });

        await supabase
          .from('enrollments')
          .update({ email_sent: true })
          .eq('id', enrollment.id);
      } catch (emailErr) {
        console.error('[Webhook email error]', emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('[POST /api/webhooks/mercadopago]', err);
    return NextResponse.json({ error: 'Erro no webhook.' }, { status: 500 });
  }
}
