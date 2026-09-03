import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'
import { TEMPLATES } from './transactional-email-templates/registry.ts'

// Simple per-instance rate limiter for public form endpoints.
const hits = new Map<string, number[]>()

export function allowRequest(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

export function clientKey(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

function adminClient() {
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) return null
  return createClient(url, key)
}

async function logSend(
  templateName: string,
  recipient: string,
  status: 'sent' | 'suppressed' | 'failed',
  errorMessage?: string,
) {
  const supabase = adminClient()
  if (!supabase) return
  const { error } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: templateName,
    recipient_email: recipient,
    status,
    error_message: errorMessage ?? null,
  })
  if (error) {
    console.error('Failed to write email_send_log', {
      code: error.code,
      message: error.message,
    })
  }
}

/**
 * Sends a registered notification template and records the outcome in
 * email_send_log. Never throws — form submissions must not fail because a
 * notification could not be delivered.
 */
export async function notifyTeam(
  templateName: string,
  templateData: Record<string, unknown>,
  idempotencyKey: string,
): Promise<{ sent: boolean; reason?: string }> {
  const recipient = TEMPLATES[templateName]?.to ?? 'unknown'
  try {
    const result = await sendTemplateEmail(templateName, recipient, {
      templateData,
      idempotencyKey,
    })
    if (result.sent) {
      await logSend(templateName, recipient, 'sent')
      return { sent: true }
    }
    await logSend(templateName, recipient, 'suppressed')
    return { sent: false, reason: result.reason }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Notification email failed', { templateName, message })
    await logSend(templateName, recipient, 'failed', message)
    return { sent: false, reason: 'send_failed' }
  }
}
