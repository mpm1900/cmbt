import { LogHeader } from '@/components/ui/log'
import { applyModifiers } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCombat, useCombatUi } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useUpkeepController() {
  const combat = useCombat()
  const actions = useActions()
  const ui = useCombatUi()
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const isUpkeep = combat.turn.status === 'upkeep'

  useEffect(() => {
    if (isUpkeep) {
      if (combat.turn.count > 0) {
        combat.log(<LogHeader>turn {combat.turn.count}</LogHeader>)
      }

      const stagedEntries = Object.entries(combat.stagedActions)
      const stagedUnitIds = stagedEntries.filter((e) => !!e[1]).map((v) => v[0])
      stagedEntries.forEach(([id, stagedActions]) => {
        if (stagedActions) {
          actions.enqueue(...stagedActions)
        }
      })

      const userUnits = combat.units.filter(
        (u) => u.flags.isActive && u.teamId == combat.user
      )
      const foundUnit = userUnits.find(
        (u) =>
          !stagedUnitIds.includes(u.id) &&
          !applyModifiers(u, ctx).unit.flags.isStunned
      )
      ui.setActiveUnit(foundUnit)

      fns.pushTriggers('on Turn Start', ctx)
      combat.setStatus('main')
    }
  }, [isUpkeep])
}
