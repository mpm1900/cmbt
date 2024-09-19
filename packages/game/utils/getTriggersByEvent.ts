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
      return (
        t.events.includes(event) &&
        (t.delay ?? 0) <= 0 &&
        ctx.units.some((u) => t.filter(u, ctx, args))
      )
    })
}
