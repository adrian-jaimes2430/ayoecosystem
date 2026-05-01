CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit a lead via the public landing forms
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies → leads remain private from the client.
-- They are forwarded by an edge function (service role) to acceso@ayoecosystem.com.

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_email_idx ON public.leads (email);