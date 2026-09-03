import { z } from 'npm:zod@3.23.8'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { allowRequest, clientKey, notifyTeam } from '../_shared/lead-notify.ts'

const BodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  interest: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().max(1000).optional().default(''),
})

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  if (!allowRequest(`contact:${clientKey(req)}`)) {
    return json({ error: 'Too many requests' }, 429)
  }

  let parsed
  try {
    parsed = BodySchema.safeParse(await req.json())
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  if (!parsed.success) {
    return json({ error: parsed.error.flatten().fieldErrors }, 400)
  }

  const { name, email, interest, message } = parsed.data
  const result = await notifyTeam(
    'general-contact',
    {
      name,
      email,
      interest,
      message,
      submittedAt: new Date().toLocaleString('es-CO'),
    },
    `contact-${email}-${new Date().toISOString().slice(0, 13)}`,
  )

  return json({ success: true, sent: result.sent })
})
