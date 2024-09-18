import { ActionResult, ActionsQueueItem, CombatContext } from '@repo/game/types'

export function getResultsFromActionItem(
  item: ActionsQueueItem,
  ctx: CombatContext
): ActionResult[] {
  const { action, targetIds, indexTarget } = item
  const source = ctx.units.find((u) => u.id === action.sourceId)!
  let targets = ctx.units.filter((u) => targetIds?.includes(u.id))
  if (indexTarget) {
    const possibleTargets = ctx.units.filter(
      (u, i) => u.flags.isActive && u.teamId === indexTarget.teamId
    )
    const slotTargets = possibleTargets.filter((u, i) =>
      indexTarget.indexes.includes(i)
    )
    targets.push(...slotTargets)
  }

  const results = action.resolve(source, targets, ctx)
  return results
}
