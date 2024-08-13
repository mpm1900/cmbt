import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCombatContext } from './useCombatContext'

export function useCombatSetup() {
  const ctx = useCombatContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (ctx.teams.length === 0) {
      navigate({ to: '/' })
    }
  }, [])
}
