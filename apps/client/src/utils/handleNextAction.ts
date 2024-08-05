import { CommitResults } from '@/hooks'
import { ActionStore, queueComparator, TurnStatus } from '@/hooks/state'
import { ActionResult, GameContext } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getResultFromActionItem } from './getResultFromActionItem'
import { logActionResult } from './logActionResult'

export function handleNextAction(
  status: TurnStatus,
  queue: ActionStore,
  ctx: GameContext,
  commitResult: CommitResults,
  handleResult: (result: ActionResult | undefined, queueLength: number) => void,
  handleNext?: () => void
) {
  queue.sort(ctx)
  const sorted = queue.queue.sort(queueComparator(ctx))
  const item = sorted[0]
  if (item) {
    const shouldCommitAction =
      status === 'cleanup' || isUnitAliveCtx(item.action.sourceId, ctx)

    if (shouldCommitAction) {
      commitResult({ action: item.action, mutations: [item.action.cost] }, ctx)
      const result = getResultFromActionItem(item, ctx)
      logActionResult(item.action, result, ctx)
      return handleResult(result, sorted.length)
    }

    return handleResult(undefined, sorted.length)
  }

  return handleNext && handleNext()
}
