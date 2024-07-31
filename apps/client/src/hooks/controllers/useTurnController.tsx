import { useEffect } from 'react'
import { useActions, useTurn } from '../state'
import { useGameActions } from '../useGameActions'
import { useGameContext } from '../useGameContext'
import { handleNextAction } from '@/utils'
import { GAME_SPEED } from '@/constants'
import { isUnitAliveCtx } from '@repo/game/utils'

export function useTurnController() {
  const { turn, pushResult } = useTurn()
  const active = turn.results[turn.results.length - 1]
  const queue = useActions()
  const fns = useGameActions()
  let ctx = useGameContext()

  useEffect(() => {
    if (turn.status === 'running') {
      handleNextAction(
        'running',
        queue,
        ctx,
        fns.commitResult,
        (result) => {
          pushResult(result)
        },
        () => fns.cleanup(true, ctx)
      )
    }
  }, [turn.status, queue.queue.length])

  function nextAction() {
    setTimeout(
      () => {
        queue.dequeue()
      },
      GAME_SPEED * 2 * (active ? 1 : 0)
    )
  }

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        ctx = fns.commitResult(active, ctx, { enableLog: true })

        const deadActiveUnits = ctx.units.filter(
          (u) => u.flags.isActive && !isUnitAliveCtx(u.id, ctx)
        )
        setTimeout(
          () => {
            ctx = fns.cleanupResult(ctx)
            nextAction()
          },
          GAME_SPEED * 2 * (deadActiveUnits.length > 0 ? 1 : 0)
        )
      }, GAME_SPEED)
    } else {
      nextAction()
    }
  }, [turn.results.length])
}
