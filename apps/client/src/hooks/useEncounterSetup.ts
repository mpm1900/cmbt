import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useEncounter } from './state/useEncounter'
import { useEncounterContext } from './useEncounterContext'

export function useEncounterSetup() {
  const store = useEncounter()
  const ctx = useEncounterContext()
  const nav = useNavigate()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!store.encounter.id) {
      nav({ to: '/' })
    } else {
      store.encounter.setup(ctx)
      setReady(true)
    }
  }, [])

  return ready
}
