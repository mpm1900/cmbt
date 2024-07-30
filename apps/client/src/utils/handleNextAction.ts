import { CommitResults } from '@/hooks'
import { ActionStore, TurnStatus } from '@/hooks/state'
import { ActionResult, GameContext } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getResultFromActionItem } from './getResultFromActionItem'

export function handleNextAction(
  status: TurnStatus,
  queue: ActionStore,
  ctx: GameContext,
  commitResult: CommitResults,
  handleResult: (result: ActionResult | undefined) => void,
  handleNext: () => void
) {
  const item = queue.sort(ctx)[0]
  if (item) {
    const shouldCommitAction =
      status === 'cleanup' || isUnitAliveCtx(item.action.sourceId, ctx)

    if (shouldCommitAction) {
      commitResult({ action: item.action, mutations: [item.action.cost] }, ctx)
      const result = getResultFromActionItem(item, ctx)
      return handleResult(result)
    }

    return handleResult(undefined)
  }

  return handleNext()
}
