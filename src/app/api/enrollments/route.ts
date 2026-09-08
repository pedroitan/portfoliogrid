import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createPixPayment } from '@/lib/mercadopago';
import { sendAdminNotification } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import {
  isValidCPF,
  isValidEmail,
  isValidName,
  isValidPhone,
  normalizeEmail,
  normalizeName,
  onlyDigits,
} from '@/lib/validation';

const COURSE_PRICE = 10;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`enroll:${ip}`, 5, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Requisicao invalida.' }, { status: 400 });
    }

    const name = normalizeName(body.name);
    const normalizedEmail = normalizeEmail(body.email);
    const phoneDigits = onlyDigits(body.phone);
    const cpfDigits = onlyDigits(body.cpf);

    if (!name || !normalizedEmail || !phoneDigits || !cpfDigits) {
      return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
    }
    if (!isValidName(name)) {
      return NextResponse.json({ error: 'Nome invalido.' }, { status: 400 });
    }
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'E-mail invalido.' }, { status: 400 });
    }
    if (!isValidPhone(phoneDigits)) {
      return NextResponse.json({ error: 'WhatsApp invalido.' }, { status: 400 });
    }
    if (!isValidCPF(cpfDigits)) {
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
    sendAdminNotification({ name, email: normalizedEmail, phone: phoneDigits, cpf: cpfDigits }).catch(
      (err) => {
        console.error('[Email admin error]', err);
      }
    );

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
      { error: 'Nao foi possivel processar a inscricao. Tente novamente.' },
      { status: 500 }
    );
  }
}
