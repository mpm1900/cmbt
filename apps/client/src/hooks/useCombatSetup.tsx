import { useEffect } from 'react'
import { useCombatContext } from './useCombatContext'
import { Identity, Potion } from '@repo/game/data'
import { useNavigate } from '@tanstack/react-router'
import { useCombatActions } from './useCombatActions'
import { useCombat } from './state'

export function useCombatSetup() {
  const combat = useCombat()
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const navigate = useNavigate()

  useEffect(() => {
    if (ctx.units.length === 0) {
      navigate({ to: '/' })
    } else {
      combat.addItems(
        combat.user,
        new Potion({
          sourceId: ctx.user,
          teamId: ctx.user,
          cost: new Identity({}),
          count: 1,
          attackType: 'physical',
          maxTargetCount: 1,
        })
      )

      fns.nextTurn(false, ctx)
    }
  }, [])
}
