import { ActionsQueueItem, CombatContext, Unit } from '../types'

export function applyTauntToQueue(source: Unit, ctx: CombatContext) {
  const allies = ctx.units.filter(
    (u) => u.flags.isActive && u.id !== source.id && u.teamId === source.teamId
  )
  return (queue: ActionsQueueItem[]): ActionsQueueItem[] => {
    return queue.map((item) => {
      const hasSource = item.targetIds.includes(source.id)
      const hasAlly = item.targetIds.some(
        (id) => !!allies.find((u) => u.id === id)
      )
      const canTargetSource = item.action.targets
        .resolve(ctx)
        .some((u) => u.id === source.id)

      if (
        item.targetIds.length === 1 &&
        hasAlly &&
        !hasSource &&
        canTargetSource
      ) {
        return {
          ...item,
          targetIds: [source.id],
        }
      }
      return item
    })
  }
}
