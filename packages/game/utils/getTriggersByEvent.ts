import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '../types'

export function getTriggersByEvent(
  modifiers: Modifier[],
  event: TriggerEvent,
  ctx: CombatContext,
  args?: MutationFilterArgs
): Trigger[] {
  args = args || {}
  return modifiers
    .filter((m) => m instanceof Trigger)
    .filter((t) => {
      const hasUnits = ctx.units.some((u) => t.filter(u, ctx, args))
      const isDelayed = (t.delay ?? 0) > 0
      return t.events.includes(event) && !isDelayed && hasUnits
    })
}
