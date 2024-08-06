import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useDebugMode, useTurn } from '../state'
import { useCombatContext } from '../useCombatContext'
import { useCombatActions } from '../useCombatActions'

export function useInputController() {
  const { queue, sort } = useActions()
  const { turn, setStatus } = useTurn()
  const debug = useDebugMode()
  const fns = useCombatActions()
  let ctx = useCombatContext()

  function startTurn() {
    setStatus('running')
    ctx = fns.runTriggers('on Turn Start', ctx)
    sort(ctx)
  }

  useEffect(() => {
    if (turn.status === 'waiting-for-input') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = debug.active ? 1 : actionableUnits.length
      if (queue.length === checkLength && queue.length > 0) {
        startTurn()
      }
    }
  }, [turn.status, queue.length])
}
