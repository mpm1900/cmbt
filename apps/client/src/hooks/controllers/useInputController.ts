import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useCombat, useCombatSettings } from '../state'
import { useCombatContext } from '../useCombatContext'
import { useCombatActions } from '../useCombatActions'

export function useInputController() {
  const combat = useCombat()
  const { queue, sort } = useActions()
  const debug = useCombatSettings()
  const fns = useCombatActions()
  let ctx = useCombatContext()

  function startTurn() {
    combat.setStatus('combat')
    ctx = fns.runTriggers('on Turn Start', ctx)
    sort(ctx)
  }

  useEffect(() => {
    if (ctx.turn.status === 'main') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = debug.isDebugMode ? 1 : actionableUnits.length
      if (queue.length === checkLength && queue.length > 0) {
        startTurn()
      }
    }
  }, [ctx.turn.status, queue.length])
}
