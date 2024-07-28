import { useEffect } from 'react'
import { getActionableUnitsCtx } from '@repo/game/utils'
import { useActions, useTurn } from '../state'
import { useGameContext } from '../useGameContext'
import { useGameActions } from '../useGameActions'

export function useIdleController() {
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
    if (turn.status === 'idle') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = actionableUnits.length
      if (queue.length === checkLength && queue.length > 0) {
        startTurn()
      }
    }
  }, [queue.length])
}
