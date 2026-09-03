import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  to,
  name,
  courseTitle,
  date,
  time,
  location,
}: {
  to: string;
  name: string;
  courseTitle: string;
  date: string;
  time: string;
  location: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[Resend] RESEND_API_KEY nao configurada.');
    throw new Error('RESEND_API_KEY nao configurada.');
  }

  console.log('[Resend] Enviando confirmacao para', to);
  const result = await resend.emails.send({
    from: 'Pedro Itan <contato@pedroitan.com>',
    to: [to],
    subject: `Inscricao confirmada - ${courseTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
        <h2 style="font-size:22px;margin-bottom:8px;">Ola, ${name}!</h2>
        <p style="font-size:15px;line-height:1.6;color:#333;">
          Sua inscricao para a <strong>${courseTitle}</strong> foi confirmada com sucesso.
        </p>
        <div style="margin:24px 0;padding:16px;background:#f5f5f5;border-left:3px solid #22d3ee;border-radius:4px;">
          <p style="margin:8px 0;"><strong>Data:</strong> ${date}</p>
          <p style="margin:8px 0;"><strong>Horario:</strong> ${time}</p>
          <p style="margin:8px 0;"><strong>Local:</strong> ${location}</p>
        </div>
        <p style="font-size:15px;line-height:1.6;color:#333;">
          Nos vemos la!<br/>
          Qualquer duvida, responda este e-mail.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="font-size:13px;color:#888;">
          — Pedro Itan<br/>
          <a href="https://pedroitan.com" style="color:#555;">pedroitan.com</a>
        </p>
      </div>
    `,
  });

  console.log('[Resend] Resultado confirmacao:', result);
  return result;
}

export async function sendAdminNotification({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[Resend] RESEND_API_KEY nao configurada.');
    throw new Error('RESEND_API_KEY nao configurada.');
  }

  console.log('[Resend] Enviando notificacao admin');
  const result = await resend.emails.send({
    from: 'Pedro Itan <contato@pedroitan.com>',
    to: ['contato@pedroitan.com'],
    subject: 'Nova inscricao na Oficina Producao Musical com IA',
    text: `Nova inscricao recebida:\n\nNome: ${name}\nE-mail: ${email}\nWhatsApp: ${phone}\n\nAguardando pagamento.`,
  });

  console.log('[Resend] Resultado notificacao admin:', result);
  return result;
}
