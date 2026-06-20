import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  interest?: string
  message?: string
  submittedAt?: string
}

const Email = ({ name, email, interest, message, submittedAt }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nueva solicitud de acceso · {name || 'Contacto'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nueva solicitud · A&O Ecosystem</Heading>
        <Text style={lead}>Se recibió una nueva solicitud desde el formulario de contacto.</Text>
        <Section style={card}>
          <Row label="Nombre" value={name} />
          <Row label="Correo" value={email} />
          <Row label="Interés" value={interest} />
          <Row label="Mensaje" value={message} />
          {submittedAt ? <Row label="Enviado" value={submittedAt} /> : null}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Aviso automático generado por el sitio de A&O Ecosystem.</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Section style={{ marginBottom: '12px' }}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value || '—'}</Text>
  </Section>
)

export const template = {
  component: Email,
  subject: (d: Props) => `Solicitud de acceso · ${d?.name ?? 'Contacto'}`,
  displayName: 'A&O · Contacto general',
  to: 'info@ayoecosystem.com',
  previewData: {
    name: 'María García',
    email: 'maria@example.com',
    interest: 'Mentoría',
    message: 'Quiero saber más del ecosistema.',
    submittedAt: '2026-06-20 10:00',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '32px 24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }
const lead = { fontSize: '14px', color: '#475569', margin: '0 0 20px' }
const card = { border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc' }
const rowLabel = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#64748b', margin: '0 0 4px', fontWeight: 600 }
const rowValue = { fontSize: '15px', color: '#0f172a', margin: 0, lineHeight: '1.4' }
const hr = { borderColor: '#e2e8f0', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: 0 }