import { LogHeader } from '@/components/ui/log'
import { useEffect } from 'react'
import { useCombat, useCombatUi } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useUpkeepController() {
  const combat = useCombat()
  const ui = useCombatUi()
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const isUpkeep = combat.turn.status === 'upkeep'

  useEffect(() => {
    if (isUpkeep) {
      if (combat.turn.count > 0) {
        combat.log(<LogHeader>turn {combat.turn.count}</LogHeader>)
      }
      ui.setActiveUnit(
        combat.units.find((u) => u.flags.isActive && u.teamId === combat.user)
      )
      fns.pushTriggers('on Turn Start', ctx)
      combat.setStatus('main')
    }
  }, [isUpkeep])
}
