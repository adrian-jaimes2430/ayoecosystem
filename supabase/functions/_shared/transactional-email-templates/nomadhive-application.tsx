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
  phone?: string
  experience?: string
  submittedAt?: string
}

const Email = ({ name, email, phone, experience, submittedAt }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nueva aplicación NomadHive de {name || 'un candidato'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nueva aplicación · NomadHive</Heading>
        <Text style={lead}>
          Se recibió una nueva aplicación al sistema selectivo de talento remoto.
        </Text>

        <Section style={card}>
          <Row label="Nombre" value={name} />
          <Row label="Correo" value={email} />
          <Row label="WhatsApp" value={phone} />
          <Row label="Experiencia" value={experience || '—'} />
          {submittedAt ? <Row label="Enviado" value={submittedAt} /> : null}
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          Este aviso fue generado automáticamente por el funnel de NomadHive en A&O Ecosystem.
        </Text>
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
  subject: (d: Props) => `Nueva aplicación NomadHive · ${d?.name ?? 'Candidato'}`,
  displayName: 'NomadHive · Nueva aplicación',
  to: 'talento@ayoecosystem.com',
  previewData: {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+57 300 123 4567',
    experience: '2 años en ventas remotas B2B.',
    submittedAt: '2026-06-20 10:00',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  color: '#0f172a',
}
const container = { padding: '32px 24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }
const lead = { fontSize: '14px', color: '#475569', margin: '0 0 20px' }
const card = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#f8fafc',
}
const rowLabel = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#64748b',
  margin: '0 0 4px',
  fontWeight: 600,
}
const rowValue = { fontSize: '15px', color: '#0f172a', margin: 0, lineHeight: '1.4' }
const hr = { borderColor: '#e2e8f0', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: 0 }