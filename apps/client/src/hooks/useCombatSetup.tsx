import { useEffect } from 'react'
import { useCombatContext } from './useCombatContext'
import { Identity, Potion } from '@repo/game/data'
import { useItems } from './state/useItems'
import { useNavigate } from '@tanstack/react-router'
import { useCombatActions } from './useCombatActions'

export function useCombatSetup() {
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const item = useItems()
  const navigate = useNavigate()

  useEffect(() => {
    if (ctx.units.length === 0) {
      navigate({ to: '/' })
    } else {
      /*
      item.addItems(
        new Potion({
          sourceId: ctx.user,
          teamId: ctx.user,
          cost: new Identity({}),
          count: 1,
          attackType: 'physical',
          maxTargetCount: 1,
        })
      )
        */
      fns.nextTurn(false, ctx)
    }
  }, [])
}
