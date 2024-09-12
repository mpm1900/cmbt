import { ActionResult, ActionsQueueItem, CombatContext } from '@repo/game/types'

export function getResultsFromActionItem(
  item: ActionsQueueItem,
  ctx: CombatContext
): ActionResult[] {
  const { action, targetIds } = item
  const targets = ctx.units.filter((u) => targetIds.includes(u.id))
  const source = ctx.units.find((u) => u.id === action.sourceId)!
  const results = action.resolve(source, targets, ctx)
  return results
}
