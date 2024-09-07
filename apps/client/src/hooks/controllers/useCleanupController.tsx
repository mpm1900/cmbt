import { getTeamsWithSelectionRequired, handleNextAction } from '@/utils'
import { SetIsActive } from '@repo/game/data'
import { nanoid } from 'nanoid/non-secure'
import { useEffect } from 'react'
import { useCleanup, useCombat } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useCleanupController() {
  const fns = useCombatActions()
  let queue = useCleanup()
  let ctx = useCombatContext()
  const log = useCombat((s) => s.log)

  useEffect(() => {
    // return setStatus('done')
    if (ctx.turn.status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(ctx)
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
          log,
          ctx,
          fns.commitResult,
          (result, ctx) => {
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
