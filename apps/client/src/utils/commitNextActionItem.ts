import { GAME_SPEED } from '@/constants'
import { CommitResults } from '@/hooks'
import { ActionStore, TurnStatus } from '@/hooks/state'
import { GameContext } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getResultFromActionItem } from './getResultFromActionItem'

export function commitNextActionItem(
  status: TurnStatus,
  queue: ActionStore,
  ctx: GameContext,
  commitResult: CommitResults,
  next: () => void
) {
  const item = queue.sort(ctx)[0]
  if (item) {
    const shouldCommitAction =
      status === 'cleanup' || isUnitAliveCtx(item.action.sourceId, ctx)

    if (shouldCommitAction) {
      ctx = commitResult({ mutations: [item.action.cost] }, ctx)
      const result = getResultFromActionItem(item, ctx)
      commitResult(result, ctx, { enableLog: true })
    }

    setTimeout(() => {
      queue.dequeue()
    }, GAME_SPEED)
  } else {
    next()
  }
}
