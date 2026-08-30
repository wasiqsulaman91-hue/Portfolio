-- Table to store portfolio contact-form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Allow anyone (anon key, i.e. website visitors) to INSERT a message
create policy "Anyone can submit a contact message"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- No SELECT/UPDATE/DELETE policy for anon => visitors cannot read
-- other people's messages. Only the service role (used server-side,
-- e.g. in the Supabase dashboard or an Edge Function) can read them.