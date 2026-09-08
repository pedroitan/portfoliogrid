create table if not exists enrollments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  cpf text,
  payment_method text default 'pix',
  payment_status text default 'pending',
  mercado_pago_payment_id text,
  mercado_pago_preference_id text,
  amount integer not null default 10000,
  qr_code text,
  qr_code_base64 text,
  ticket_url text,
  confirmed boolean default false,
  email_sent boolean default false,
  notes text,
  unique(email)
);

-- Habilita Row Level Security e permite acesso via service_role
alter table enrollments enable row level security;

-- Política para leitura/escrita via service_role (usado no back-end)
create policy "Allow service role full access" on enrollments
  for all
  to service_role
  using (true)
  with check (true);

-- Configuracoes gerais (preco da oficina, etc.)
create table if not exists settings (
  key text primary key,
  value text not null
);

alter table settings enable row level security;

create policy "Allow service role full access" on settings
  for all
  to service_role
  using (true)
  with check (true);

-- Preco da oficina em centavos (1000 = R$ 10,00)
insert into settings (key, value)
values ('course_price_centavos', '1000')
on conflict (key) do nothing;
