import { CommitResult } from '@/hooks'
import { ActionStore, CombatLogger } from '@/hooks/state'
import { ActionResult, CombatContext, TurnStatus } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getResultFromActionItem } from './getResultFromActionItem'
import { logActionIntent } from './logActionIntent'

export function handleNextAction(
  status: TurnStatus,
  queue: ActionStore,
  log: CombatLogger,
  ctx: CombatContext,
  commitResult: CommitResult,
  handleResult: (result: ActionResult | undefined, ctx: CombatContext) => void,
  handleNext?: (ctx: CombatContext) => void
) {
  const item = queue.first(ctx)
  if (item) {
    const source = ctx.units.find((u) => u.id === item.action.sourceId)
    const shouldCommitAction =
      status === 'cleanup' || isUnitAliveCtx(source, ctx)

    if (shouldCommitAction) {
      ctx = commitResult(
        { action: item.action, mutations: [item.action.cost] },
        ctx
      )
      const result = getResultFromActionItem(item, ctx)
      logActionIntent(item.action, result, log, ctx)
      return handleResult(result, ctx)
    }

    return handleResult(undefined, ctx)
  }

  return handleNext && handleNext(ctx)
}
