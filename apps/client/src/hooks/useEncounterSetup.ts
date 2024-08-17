import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useEncounter } from './state/useEncounter'

export function useEncounterSetup() {
  const store = useEncounter()
  const nav = useNavigate()

  useEffect(() => {
    if (!store.encounter.id) {
      nav({ to: '/' })
    }
  }, [])
}
