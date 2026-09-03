import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getPaymentStatus } from '@/lib/mercadopago';
import { sendConfirmationEmail, sendAdminPaymentConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = body.data?.id?.toString();
    const type = body.type;

    if (!paymentId || type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const payment = await getPaymentStatus(paymentId);
    const wasApproved = payment.status === 'approved';

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('mercado_pago_payment_id', paymentId)
      .maybeSingle();

    if (!enrollment) {
      return NextResponse.json({ ok: true });
    }

    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        payment_status: payment.status,
        confirmed: wasApproved,
      })
      .eq('mercado_pago_payment_id', paymentId);

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
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro no webhook.' },
      { status: 500 }
    );
  }
}
