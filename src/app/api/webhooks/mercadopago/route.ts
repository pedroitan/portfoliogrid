import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { supabase } from '@/lib/supabase';
import { getPaymentStatus } from '@/lib/mercadopago';
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
    const paymentId: string | undefined =
      req.nextUrl.searchParams.get('data.id') ?? body?.data?.id?.toString();
    const type = body?.type ?? req.nextUrl.searchParams.get('type');

    if (!paymentId || type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    if (!verifySignature(req, paymentId)) {
      console.warn('[Webhook] Assinatura invalida para payment', paymentId);
      return NextResponse.json({ error: 'Assinatura invalida.' }, { status: 401 });
    }

    const payment = await getPaymentStatus(paymentId);
    const wasApproved = payment.status === 'approved';

    let { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('mercado_pago_payment_id', paymentId)
      .maybeSingle();

    // Pagamentos via Checkout Pro chegam com external_reference = id da inscricao
    if (!enrollment && payment.external_reference) {
      const { data } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', payment.external_reference)
        .maybeSingle();
      enrollment = data;
    }

    if (!enrollment) {
      return NextResponse.json({ ok: true });
    }

    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        payment_status: payment.status,
        confirmed: wasApproved,
        mercado_pago_payment_id: paymentId,
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
          paymentId,
          amount: enrollment.amount,
        });

        await supabase
          .from('enrollments')
          .update({ email_sent: true })
          .eq('mercado_pago_payment_id', paymentId);
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
