import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const autoReplyContent = {
  pt: {
    subject: 'Recebi sua mensagem! ✉️',
    html: (name: string) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
        <h2 style="font-size:22px;margin-bottom:8px;">Olá, ${name}! 👋</h2>
        <p style="font-size:15px;line-height:1.6;color:#333;">
          Recebi sua mensagem e agradeço muito o contato!<br/>
          Entrarei em contato em breve para conversarmos melhor.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="font-size:13px;color:#888;">
          — Itan<br/>
          <a href="https://pedroitan.com" style="color:#555;">pedroitan.com</a>
        </p>
      </div>
    `,
  },
  en: {
    subject: 'Got your message! ✉️',
    html: (name: string) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
        <h2 style="font-size:22px;margin-bottom:8px;">Hi, ${name}! 👋</h2>
        <p style="font-size:15px;line-height:1.6;color:#333;">
          I received your message — thank you for reaching out!<br/>
          I'll get back to you shortly.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="font-size:13px;color:#888;">
          — Itan<br/>
          <a href="https://pedroitan.com" style="color:#555;">pedroitan.com</a>
        </p>
      </div>
    `,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, locale } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const lang = locale === 'en' ? 'en' : 'pt';

    const [notification, autoReply] = await Promise.all([
      resend.emails.send({
        from: 'Portfolio <contato@pedroitan.com>',
        to: ['contato@pedroitan.com'],
        replyTo: email,
        subject: `Contato via portfólio — ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      resend.emails.send({
        from: 'Itan <contato@pedroitan.com>',
        to: [email],
        subject: autoReplyContent[lang].subject,
        html: autoReplyContent[lang].html(name),
      }),
    ]);

    if (notification.error) {
      console.error('[Resend notification error]', JSON.stringify(notification.error));
      return NextResponse.json({ error: notification.error.message }, { status: 500 });
    }

    if (autoReply.error) {
      console.warn('[Resend auto-reply error]', JSON.stringify(autoReply.error));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
