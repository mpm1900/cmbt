import { useEffect } from 'react'
import { useCleanup } from '../state'
import { useCombatContext } from '../useCombatContext'
import { useCombatActions } from '../useCombatActions'
import { getTeamsWithSelectionRequired, handleNextAction } from '@/utils'
import { nanoid } from 'nanoid/non-secure'
import { SetIsActive } from '@repo/game/data'

export function useCleanupController() {
  const fns = useCombatActions()
  let queue = useCleanup()
  let ctx = useCombatContext()

  useEffect(() => {
    if (ctx.turn.status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(ctx)
      console.log('teams', teams)
      if (queue.queue.length === teams.length && teams.length > 0) {
        queue = queue.setQueue((items) => [
          {
            id: nanoid(),
            action: new SetIsActive('', ''),
            targetIds: items.flatMap((i) => i.targetIds),
          },
        ])
        handleNextAction(
          'cleanup',
          queue,
          ctx,
          fns.commitResult,
          (result, queueLength, ctx) => {
            if (result) {
              ctx = fns.commitResult(result, ctx, { enableLog: true })
              ctx = fns.cleanupResult(ctx)
              queue.setQueue(() => [])
              fns.cleanup(ctx.turn.count > 0, ctx)
            }
          }
        )
      }
    }
  }, [ctx.turn.status, queue.queue.length])
}
