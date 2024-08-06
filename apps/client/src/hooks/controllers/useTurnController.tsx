import { useEffect } from 'react'
import { useActions, useCombat } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'
import { handleNextAction } from '@/utils'
import { GAME_SPEED } from '@/constants'
import { isUnitAliveCtx } from '@repo/game/utils'

export function useTurnController() {
  const { turn, pushResult } = useCombat()
  const active = turn.results[turn.results.length - 1]
  const queue = useActions()
  const fns = useCombatActions()
  let ctx = useCombatContext()

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
    if (turn.status === 'running') {
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
