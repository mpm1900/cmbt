import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useEncounter } from './state/useEncounter'
import { useEncounterContext } from './useEncounterContext'

export function useEncounterSetup() {
  const store = useEncounter()
  const ctx = useEncounterContext()
  const nav = useNavigate()

  useEffect(() => {
    if (!store.encounter.id) {
      nav({ to: '/' })
    } else {
      store.encounter.setup(ctx)
    }
  }, [])
}
