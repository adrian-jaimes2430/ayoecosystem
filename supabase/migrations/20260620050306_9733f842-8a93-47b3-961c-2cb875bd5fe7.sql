
-- 1. Replace overly-permissive WITH CHECK (true) on leads insert
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (name IS NULL OR length(name) <= 120)
    AND (source IS NULL OR length(source) <= 80)
  );

-- 2. Pin search_path on SECURITY DEFINER functions and ensure only service_role can execute.
ALTER FUNCTION public.enqueue_email(TEXT, JSONB) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.read_email_batch(TEXT, INT, INT) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.delete_email(TEXT, BIGINT) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.move_to_dlq(TEXT, TEXT, BIGINT, JSONB) SET search_path = public, pgmq, pg_temp;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(TEXT, INT, INT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(TEXT, BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(TEXT, TEXT, BIGINT, JSONB) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(TEXT, INT, INT) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(TEXT, BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(TEXT, TEXT, BIGINT, JSONB) TO service_role;
