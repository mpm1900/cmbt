import {
  ActionResult,
  ActionsQueueItem,
  CombatContext,
  Unit,
} from '@repo/game/types'

export function getResultFromActionItem(
  item: ActionsQueueItem,
  ctx: CombatContext
): ActionResult {
  const { action, targetIds } = item
  const targets = ctx.units.filter((u) => targetIds.includes(u.id))
  const source = ctx.units.find((u) => u.id === action.sourceId) as Unit
  const result = action.resolve(source, targets, ctx)
  return result
}
