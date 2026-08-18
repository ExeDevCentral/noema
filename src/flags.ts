/**
 * NOEMA Feature Flags Configuration (Vercel Flags Compatible)
 */

export interface FlagDefinition<T = boolean> {
  key: string
  description: string
  defaultValue: T
  options?: { value: T; label: string }[]
}

export const NOEMAFLAG01: FlagDefinition<boolean> = {
  key: 'NOEMAFLAG01',
  description: 'NOEMA Feature Flag 01 — Control de funcionalidades y rollout gradual en Vercel',
  defaultValue: false,
  options: [
    { value: false, label: 'Desactivado (Off)' },
    { value: true, label: 'Activado (On)' },
  ],
}

export const ALL_FLAGS = {
  NOEMAFLAG01,
} as const

export type FlagKey = keyof typeof ALL_FLAGS
