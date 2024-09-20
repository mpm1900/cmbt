import { getActionableUnitsCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCombat, useCombatSettings } from '../state'
import { useCombatContext } from '../useCombatContext'

export function useMainController() {
  const combat = useCombat()
  const ctx = useCombatContext()
  const actions = useActions()
  const { isDebugMode } = useCombatSettings()
  const isMain = combat.turn.status === 'main'

  useEffect(() => {
    if (isMain) {
      const actionableUnits = getActionableUnitsCtx(ctx)
      const checkLength = isDebugMode ? 1 : actionableUnits.length
      //const checkLength = actionableUnits.length
      if (actions.queue.length === checkLength && actions.queue.length > 0) {
        combat.setStatus('combat')
      }
    }
  }, [isMain, actions.queue.length])
}
