import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useTurn } from '../state'
import { useGameContext } from '../useGameContext'
import { useGameActions } from '../useGameActions'

export function useInputController() {
  const { queue, sort } = useActions()
  const { turn, setStatus } = useTurn()
  const ctx = useGameContext()
  const fns = useGameActions()

  function startTurn() {
    setStatus('running')
    const context = fns.runTriggers('onTurnStart', ctx)
    sort(context)
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
