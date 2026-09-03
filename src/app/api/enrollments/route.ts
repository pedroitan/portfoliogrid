import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createPixPayment } from '@/lib/mercadopago';
import { sendAdminNotification } from '@/lib/email';

const COURSE_PRICE = 1;

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, cpf } = await req.json();

    if (!name || !email || !phone || !cpf) {
      return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const phoneDigits = phone.replace(/\D/g, '');
    const cpfDigits = cpf.replace(/\D/g, '');

    if (cpfDigits.length !== 11) {
      return NextResponse.json({ error: 'CPF invalido.' }, { status: 400 });
    }

    // Verifica se ja existe inscricao confirmada
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id, payment_status')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (existing && existing.payment_status === 'approved') {
      return NextResponse.json(
        { error: 'Ja existe uma inscricao confirmada para este e-mail.' },
        { status: 409 }
      );
    }

    // Cria pagamento no Mercado Pago
    const payment = await createPixPayment({
      amount: COURSE_PRICE,
      email: normalizedEmail,
      name,
      cpf: cpfDigits,
    });

    if (!payment.id) {
      return NextResponse.json(
        { error: 'Erro ao gerar pagamento. Tente novamente.' },
        { status: 500 }
      );
    }

    // Salva ou atualiza no Supabase
    const payload = {
      name,
      email: normalizedEmail,
      phone: phoneDigits,
      cpf: cpfDigits,
      payment_status: payment.status || 'pending',
      mercado_pago_payment_id: payment.id,
      amount: COURSE_PRICE * 100,
      qr_code: payment.qr_code,
      qr_code_base64: payment.qr_code_base64,
      ticket_url: payment.ticket_url,
      confirmed: false,
      email_sent: false,
    };

    let enrollment;

    if (existing) {
      const { data, error } = await supabase
        .from('enrollments')
        .update(payload)
        .eq('email', normalizedEmail)
        .select('id')
        .single();

      if (error) {
        console.error('[Supabase update error]', error);
        return NextResponse.json({ error: 'Erro ao atualizar inscricao.' }, { status: 500 });
      }

      enrollment = data;
    } else {
      const { data, error } = await supabase
        .from('enrollments')
        .insert(payload)
        .select('id')
        .single();

      if (error) {
        console.error('[Supabase insert error]', error);
        return NextResponse.json({ error: 'Erro ao salvar inscricao.' }, { status: 500 });
      }

      enrollment = data;
    }

    // Envia notificacao para o admin (nao bloqueia o fluxo)
    sendAdminNotification({ name, email: normalizedEmail, phone: phoneDigits }).catch((err) => {
      console.error('[Email admin error]', err);
    });

    return NextResponse.json({
      id: enrollment.id,
      payment_id: payment.id,
      qr_code: payment.qr_code,
      qr_code_base64: payment.qr_code_base64,
      ticket_url: payment.ticket_url,
    });
  } catch (err: unknown) {
    console.error('[POST /api/enrollments]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
