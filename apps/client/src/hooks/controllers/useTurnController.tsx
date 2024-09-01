import { handleNextAction } from '@/utils'
import { getActionableUnitsCtx, isUnitAliveCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCombat, useCombatSettings } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useTurnController() {
  const { turn, log, pushResult, setStatus } = useCombat()
  const { gameSpeed, isDebugMode } = useCombatSettings()
  const active = turn.results[turn.results.length - 1]
  const fns = useCombatActions()
  const queue = useActions()
  let ctx = useCombatContext()

  function startTurn() {
    setStatus('combat')
    ctx = fns.runTriggers('on Turn Start', ctx)
    queue.sort(ctx)
  }

  function nextAction() {
    setTimeout(
      () => {
        queue.dequeue()
      },
      gameSpeed * 2 * (active ? 1 : 0)
    )
  }

  useEffect(() => {
    if (ctx.turn.status === 'main') {
      const actionableUnits = getActionableUnitsCtx(ctx)

      const checkLength = isDebugMode ? 1 : actionableUnits.length
      if (queue.queue.length === checkLength && queue.queue.length > 0) {
        startTurn()
      }
    }
  }, [ctx.turn.status, queue.queue.length])

  useEffect(() => {
    if (turn.status === 'combat') {
      handleNextAction(
        'combat',
        queue,
        log,
        ctx,
        fns.commitResult,
        (result, _ctx) => {
          ctx = _ctx
          pushResult(result)
        },
        () => fns.cleanup(true, ctx)
      )
    }
  }, [turn.status, queue.queue.length])

  useEffect(() => {
    if (turn.status === 'combat') {
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
