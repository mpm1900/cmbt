import { useEffect } from 'react'
import { useActions, useCleanup, useTurn } from '../state'
import { useGameActions } from '../useGameActions'
import { useGameContext } from '../useGameContext'
import { handleNextAction } from '@/utils'
import { LogHeader } from '@/components/ui/log'
import { GAME_SPEED } from '@/constants'
import { handleCleanup } from '@/utils/handleCleanup'
import { isUnitAliveCtx } from '@repo/game/utils'

export function useTurnController() {
  const { turn, setStatus, next, pushResult } = useTurn()
  const actionsQueue = useActions()
  const cleanupQueue = useCleanup()
  const fns = useGameActions()
  let ctx = useGameContext()

  const cleanup = (runEndOfTurnTriggers: boolean) =>
    handleCleanup(
      ctx,
      () => nextTurn(runEndOfTurnTriggers),
      () => setStatus('cleanup'),
      () => setStatus('done')
    )

  function nextTurn(runEndOfTurnTriggers: boolean) {
    if (runEndOfTurnTriggers) {
      ctx = fns.runTriggers('on Turn End', ctx)
      ctx.modifiers = fns.decrementModifierDurations()
      cleanup(false)
    } else {
      next()
      ctx.log(<LogHeader>turn {turn.count + 2}</LogHeader>)
      setStatus('waiting-for-input')
    }
  }

  useEffect(() => {
    if (turn.status === 'running') {
      handleNextAction(
        'running',
        actionsQueue,
        ctx,
        fns.commitResult,
        (result) => pushResult(result),
        () => cleanup(true)
      )
    }
  }, [turn.status, actionsQueue.queue.length])

  useEffect(() => {
    if (turn.status === 'cleanup') {
      handleNextAction(
        'cleanup',
        cleanupQueue,
        ctx,
        fns.commitResult,
        (result) => {
          if (result) {
            ctx = fns.commitResult(result, ctx)
            ctx = fns.cleanupResult(ctx)
            cleanupQueue.dequeue()
          }
        },
        () => cleanup(true)
      )
    }
  }, [turn.status, cleanupQueue.queue.length])

  const active = turn.results[turn.results.length - 1]
  function nextAction() {
    setTimeout(
      () => {
        actionsQueue.dequeue()
      },
      GAME_SPEED * 2 * (active ? 1 : 0)
    )
  }

  useEffect(() => {
    if (turn.results.length > 0) {
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
    }
  }, [turn.results.length])
}
