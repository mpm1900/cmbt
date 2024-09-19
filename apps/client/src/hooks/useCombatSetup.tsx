import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCombat } from './state'

export function useCombatSetup() {
  const combat = useCombat()
  const navigate = useNavigate()

  useEffect(() => {
    if (combat.teams.length === 0) {
      navigate({ to: '/' })
    }
  }, [])
}
