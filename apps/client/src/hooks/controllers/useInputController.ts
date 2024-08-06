import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useCombat, useDebugMode } from '../state'
import { useCombatContext } from '../useCombatContext'
import { useCombatActions } from '../useCombatActions'

export function useInputController() {
  const combat = useCombat()
  const { queue, sort } = useActions()
  const debug = useDebugMode()
  const fns = useCombatActions()
  let ctx = useCombatContext()

  function startTurn() {
    combat.setStatus('running')
    ctx = fns.runTriggers('on Turn Start', ctx)
    sort(ctx)
  }

  useEffect(() => {
    if (ctx.turn.status === 'waiting-for-input') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = debug.active ? 1 : actionableUnits.length
      if (queue.length === checkLength && queue.length > 0) {
        startTurn()
      }
    }
  }, [ctx.turn.status, queue.length])
}
