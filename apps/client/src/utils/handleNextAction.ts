import { CommitResults } from '@/hooks'
import { ActionStore, queueComparator } from '@/hooks/state'
import { ActionResult, CombatContext, TurnStatus } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getResultFromActionItem } from './getResultFromActionItem'
import { logActionIntent } from './logActionIntent'

export function handleNextAction(
  status: TurnStatus,
  queue: ActionStore,
  ctx: CombatContext,
  commitResult: CommitResults,
  handleResult: (
    result: ActionResult | undefined,
    queueLength: number,
    ctx: CombatContext
  ) => void,
  handleNext?: (ctx: CombatContext) => void
) {
  queue.sort(ctx)
  const sorted = queue.queue.sort(queueComparator(ctx))
  const item = sorted[0]
  if (item) {
    const shouldCommitAction =
      status === 'cleanup' || isUnitAliveCtx(item.action.sourceId, ctx)

    if (shouldCommitAction) {
      ctx = commitResult(
        { action: item.action, mutations: [item.action.cost] },
        ctx
      )
      const result = getResultFromActionItem(item, ctx)
      logActionIntent(item.action, result, ctx)
      return handleResult(result, sorted.length, ctx)
    }

    return handleResult(undefined, sorted.length, ctx)
  }

  return handleNext && handleNext(ctx)
}
