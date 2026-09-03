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
    raw: data,
  };
}
