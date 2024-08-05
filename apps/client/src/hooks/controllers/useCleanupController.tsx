import { useEffect } from 'react'
import { useCleanup, useTurn } from '../state'
import { useCombatContext } from '../useCombatContext'
import { useCombatActions } from '../useCombatActions'
import { getTeamsWithSelectionRequired, handleNextAction } from '@/utils'
import { nanoid } from 'nanoid/non-secure'
import { SetIsActive } from '@repo/game/data'

export function useCleanupController() {
  const status = useTurn((s) => s.turn.status)
  const fns = useCombatActions()
  let queue = useCleanup()
  let ctx = useCombatContext()

  useEffect(() => {
    if (status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(ctx)
      if (queue.queue.length === teams.length && teams.length > 0) {
        queue = queue.setQueue((items) => [
          {
            id: nanoid(),
            action: new SetIsActive('', ''),
            targetIds: items.flatMap((i) => i.targetIds),
          },
        ])
        handleNextAction('cleanup', queue, ctx, fns.commitResult, (result) => {
          if (result) {
            ctx = fns.commitResult(result, ctx, { enableLog: true })
            ctx = fns.cleanupResult(ctx)
            queue.setQueue(() => [])
            fns.cleanup(true, ctx)
          }
        })
      }
    }
  }, [status, queue.queue.length])
}
