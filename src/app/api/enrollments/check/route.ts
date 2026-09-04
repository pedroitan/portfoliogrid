import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getPaymentStatus } from '@/lib/mercadopago';
import { sendConfirmationEmail, sendAdminPaymentConfirmation } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`check:${ip}`, 30, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Muitas requisicoes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const paymentId = req.nextUrl.searchParams.get('payment_id');

  if (!paymentId || !/^\d{1,30}$/.test(paymentId)) {
    return NextResponse.json({ error: 'payment_id invalido.' }, { status: 400 });
  }

  try {
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('mercado_pago_payment_id', paymentId)
      .maybeSingle();

    if (error || !enrollment) {
      return NextResponse.json({ error: 'Inscricao nao encontrada.' }, { status: 404 });
    }

    const payment = await getPaymentStatus(paymentId);

    if (payment.status !== enrollment.payment_status) {
      const wasApproved = payment.status === 'approved';

      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          payment_status: payment.status,
          confirmed: wasApproved,
        })
        .eq('mercado_pago_payment_id', paymentId);

      if (updateError) {
        console.error('[Supabase update error]', updateError);
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
          console.error('[Email send error]', emailErr);
        }
      }
    }

    return NextResponse.json({
      status: payment.status,
      status_detail: payment.status_detail,
    });
  } catch (err: unknown) {
    console.error('[GET /api/enrollments/check]', err);
    return NextResponse.json({ error: 'Erro ao verificar pagamento.' }, { status: 500 });
  }
}
