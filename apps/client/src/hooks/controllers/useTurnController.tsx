import { useEffect } from 'react'
import { useActions, useCombat, useCombatSettings } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'
import { getTeamsWithSelectionRequired, handleNextAction } from '@/utils'
import { isUnitAliveCtx } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { SetIsActive } from '@repo/game/data'

export function useTurnController() {
  const { turn, pushResult } = useCombat()
  const gameSpeed = useCombatSettings((s) => s.gameSpeed)
  const active = turn.results[turn.results.length - 1]

  const fns = useCombatActions()
  let ctx = useCombatContext()
  let queue = useActions()

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
      gameSpeed * 2 * (active ? 1 : 0)
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
            gameSpeed * 2 * (deadActiveUnits.length > 0 ? 1 : 0)
          )
        }, gameSpeed)
      } else {
        nextAction()
      }
    }
  }, [turn.results.length])
}
