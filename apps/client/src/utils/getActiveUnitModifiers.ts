import { CombatContext, Trigger, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'

export function getActiveUnitModifiers(unit: Unit, ctx: CombatContext) {
  const { appliedModifiers, delayedModifiers, registeredTriggers } =
    applyModifiers(unit, ctx)

  const otherTriggers = ctx.modifiers.filter(
    (m) =>
      m instanceof Trigger &&
      m.parentId === unit.id &&
      !m.statusId && // this line was added to not show immune statuses
      !registeredTriggers.some((t) => t.rtid === m.rtid) &&
      !delayedModifiers.some((t) => t.rtid === m.rtid)
  )
  return [
    ...appliedModifiers.sort((a, b) => a.priority - b.priority),
    ...delayedModifiers.sort((a, b) => a.priority - b.priority),
    ...registeredTriggers.sort((a, b) => a.priority - b.priority),
    ...otherTriggers.sort((a, b) => a.priority - b.priority),
  ]
}
