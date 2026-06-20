import type { ComponentType } from 'npm:react@18.3.1'
import { template as nomadhiveApplication } from './nomadhive-application.tsx'
import { template as generalContact } from './general-contact.tsx'
import { template as anmaApplication } from './anma-application.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'nomadhive-application': nomadhiveApplication,
  'general-contact': generalContact,
  'anma-application': anmaApplication,
}