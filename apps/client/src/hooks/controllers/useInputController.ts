import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useTurn } from '../state'
import { useGameContext } from '../useGameContext'
import { useGameActions } from '../useGameActions'

export function useInputController() {
  const { queue, sort } = useActions()
  const { turn, setStatus } = useTurn()
  const fns = useGameActions()
  let ctx = useGameContext()

  function startTurn() {
    setStatus('running')
    ctx = fns.runTriggers('on Turn Start', ctx)
    sort(ctx)
  }

  useEffect(() => {
    if (turn.status === 'waiting-for-input') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = 1 // actionableUnits.length
      if (queue.length === checkLength && queue.length > 0) {
        startTurn()
      }
    }
  }, [queue.length])
}
