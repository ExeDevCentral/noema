import { useState, useEffect } from 'react'
import { ALL_FLAGS, FlagKey } from '../flags'

/**
 * Hook to evaluate a Vercel Feature Flag in React.
 * Supports:
 * 1. URL search params (e.g. ?NOEMAFLAG01=true or ?_flags=NOEMAFLAG01:1)
 * 2. LocalStorage override from Vercel Toolbar (vercel_flag_NOEMAFLAG01)
 * 3. Environment variable (VITE_FLAG_NOEMAFLAG01)
 * 4. Default configuration value
 */
export function useFlag(key: FlagKey): boolean {
  const flagDef = ALL_FLAGS[key]
  const defaultVal = flagDef ? flagDef.defaultValue : false

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultVal

    try {
      // 1. URL query param
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has(key)) {
        const val = urlParams.get(key)
        return val === 'true' || val === '1'
      }

      // 2. Vercel Toolbar / LocalStorage override
      const stored = localStorage.getItem(`vercel_flag_${key}`)
      if (stored !== null) {
        return stored === 'true' || stored === '1'
      }

      // 3. Vite Env Var
      const envVal = (import.meta.env as Record<string, string | undefined>)[`VITE_FLAG_${key}`]
      if (envVal !== undefined) {
        return envVal === 'true' || envVal === '1'
      }
    } catch (_) {}

    return defaultVal
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `vercel_flag_${key}` && e.newValue !== null) {
        setEnabled(e.newValue === 'true' || e.newValue === '1')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return enabled
}
