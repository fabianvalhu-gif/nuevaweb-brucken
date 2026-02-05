type ContactPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  country?: string;
  phone?: string;
  interest?: string;
  message?: string;
  consent?: boolean;
  // Honeypot
  website?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value: unknown, max = 2000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

async function sendWithResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Resend error: ${res.status} ${text}`.trim());
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'soporte@bruckenglobal.com';
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    return res.status(500).json({
      ok: false,
      error: 'Email service not configured (missing RESEND_API_KEY or CONTACT_FROM).',
    });
  }

  const body = (req.body ?? {}) as ContactPayload;

  // Simple bot check: field must be empty.
  if (clean(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const country = clean(body.country, 80);
  const phone = clean(body.phone, 80);
  const interest = clean(body.interest, 120);
  const message = clean(body.message, 6000);
  const consent = Boolean(body.consent);

  if (!fullName || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Campos obligatorios: nombre, email y mensaje.',
    });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Email invalido.' });
  }
  if (!consent) {
    return res.status(400).json({ ok: false, error: 'Debes aceptar la politica de privacidad.' });
  }

  const subject = `Nuevo contacto: ${fullName}${company ? ` (${company})` : ''}`;
  const escaped = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
      .replaceAll('\n', '<br/>');

  const html = `
    <div style="font-family: ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2>Nuevo mensaje desde bruckenglobal.com</h2>
      <p><strong>Nombre:</strong> ${escaped(fullName)}</p>
      <p><strong>Email:</strong> ${escaped(email)}</p>
      <p><strong>Empresa:</strong> ${escaped(company || '-')}</p>
      <p><strong>Pais:</strong> ${escaped(country || '-')}</p>
      <p><strong>Telefono:</strong> ${escaped(phone || '-')}</p>
      <p><strong>Interes:</strong> ${escaped(interest || '-')}</p>
      <hr/>
      <p><strong>Mensaje:</strong></p>
      <p>${escaped(message)}</p>
    </div>
  `;

  try {
    await sendWithResend({
      apiKey,
      from,
      to,
      subject,
      html,
      replyTo: email,
    });
    return res.status(200).json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return res.status(500).json({ ok: false, error: msg });
  }
}
