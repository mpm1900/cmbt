import { useEffect } from 'react'
import { useCleanup, useTurn } from '../state'
import { useGameContext } from '../useGameContext'
import { useGameActions } from '../useGameActions'
import { handleNextAction } from '@/utils'

export function useCleanupController() {
  const status = useTurn((s) => s.turn.status)
  const queue = useCleanup()
  const fns = useGameActions()
  let ctx = useGameContext()

  useEffect(() => {
    if (status === 'cleanup') {
      handleNextAction(
        'cleanup',
        queue,
        ctx,
        fns.commitResult,
        (result) => {
          if (result) {
            ctx = fns.commitResult(result, ctx)
            ctx = fns.cleanupResult(ctx)
            queue.dequeue()
          }
        },
        () => {
          fns.cleanup(true, ctx)
        }
      )
    }
  }, [status, queue.queue.length])
}
