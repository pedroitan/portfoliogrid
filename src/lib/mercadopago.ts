const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error('MERCADOPAGO_ACCESS_TOKEN nao configurado.');
}

const BASE_URL = 'https://api.mercadopago.com/v1';

export async function createPixPayment({
  amount,
  email,
  name,
  cpf,
}: {
  amount: number;
  email: string;
  name: string;
  cpf?: string;
}) {
  const firstName = name.split(' ')[0] ?? name;
  const lastName = name.split(' ').slice(1).join(' ') || '-';

  const body = {
    transaction_amount: amount,
    description: 'Inscricao - Oficina Producao Musical com IA',
    payment_method_id: 'pix',
    payer: {
      email,
      first_name: firstName,
      last_name: lastName,
      identification: {
        type: cpf ? 'CPF' : undefined,
        number: cpf,
      },
    },
  };

  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(`${BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Pago error: ${response.status} ${text}`);
  }

  const data = await response.json();

  return {
    id: data.id?.toString() ?? '',
    status: data.status ?? '',
    status_detail: data.status_detail ?? '',
    qr_code: data.point_of_interaction?.transaction_data?.qr_code ?? '',
    qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64 ?? '',
    ticket_url: data.point_of_interaction?.transaction_data?.ticket_url ?? '',
    raw: data,
  };
}

export async function createCardPreference({
  amount,
  email,
  name,
  cpf,
  enrollmentId,
  origin,
}: {
  amount: number;
  email: string;
  name: string;
  cpf?: string;
  enrollmentId: string;
  origin: string;
}) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || origin).replace(/\/$/, '');

  const body = {
    items: [
      {
        id: 'oficina-ia',
        title: 'Inscricao - Oficina Producao Musical com IA',
        quantity: 1,
        unit_price: amount,
        currency_id: 'BRL',
      },
    ],
    payer: {
      name,
      email,
      identification: cpf ? { type: 'CPF', number: cpf } : undefined,
    },
    payment_methods: {
      excluded_payment_types: [
        { id: 'ticket' },
        { id: 'bank_transfer' },
        { id: 'atm' },
        { id: 'prepaid_card' },
      ],
      installments: 12,
    },
    back_urls: {
      success: `${base}/oficina?pagamento=aprovado`,
      pending: `${base}/oficina?pagamento=pendente`,
      failure: `${base}/oficina?pagamento=falhou`,
    },
    auto_return: 'approved',
    external_reference: enrollmentId,
    notification_url: `${base}/api/webhooks/mercadopago`,
    statement_descriptor: 'PEDRO ITAN',
  };

  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Pago preference error: ${response.status} ${text}`);
  }

  const data = await response.json();

  return {
    id: data.id ?? '',
    init_point: data.init_point ?? data.sandbox_init_point ?? '',
  };
}

export async function getMerchantOrder(orderId: string) {
  const response = await fetch(`${BASE_URL}/merchant_orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Pago merchant order error: ${response.status} ${text}`);
  }

  const data = await response.json();

  return {
    id: data.id?.toString() ?? orderId,
    external_reference: data.external_reference ?? '',
    status: data.order_status ?? '',
    payments: ((data.payments ?? []) as Array<{
      id?: number | string;
      status?: string;
      transaction_amount?: number;
      total_paid_amount?: number;
    }>).map((p) => ({
      id: p.id?.toString() ?? '',
      status: p.status ?? '',
      amount: p.transaction_amount ?? p.total_paid_amount ?? 0,
    })),
    raw: data,
  };
}

export async function getPaymentStatus(paymentId: string) {
  const response = await fetch(`${BASE_URL}/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Pago error: ${response.status} ${text}`);
  }

  const data = await response.json();

  return {
    id: data.id?.toString() ?? paymentId,
    status: data.status ?? '',
    status_detail: data.status_detail ?? '',
    external_reference: data.external_reference ?? '',
    raw: data,
  };
}
