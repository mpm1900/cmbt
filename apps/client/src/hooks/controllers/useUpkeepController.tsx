import { LogHeader } from '@/components/ui/log'
import { applyModifiers } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCombat, useCombatUi } from '../state'
import { useCombatContext } from '../useCombatContext'

export function useUpkeepController() {
  const combat = useCombat()
  const actions = useActions()
  const ui = useCombatUi()
  const ctx = useCombatContext()
  const isUpkeep = combat.turn.status === 'upkeep'

  useEffect(() => {
    if (isUpkeep) {
      if (combat.turn.count > 0) {
        combat.log(<LogHeader>turn {combat.turn.count}</LogHeader>)
      }

      const stagedEntries = Object.entries(combat.stagedActions)
      stagedEntries.forEach(([id, stagedActions]) => {
        if (stagedActions) {
          actions.enqueue(...stagedActions)
        }
      })

      const activeUnit = combat.units.find(
        (u) =>
          u.flags.isActive &&
          u.teamId == combat.user &&
          !combat.stagedActions[u.id] &&
          !applyModifiers(u, ctx).unit.flags.isStunned
      )
      ui.setActiveUnit(activeUnit)
      combat.setStatus('main')
    }
  }, [isUpkeep])
}
