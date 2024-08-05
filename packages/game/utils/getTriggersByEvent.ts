import { Modifier, Trigger, TriggerEvent } from '../types'

export function getTriggersByEvent(
  modifiers: Modifier[],
  event: TriggerEvent
): Trigger[] {
  return modifiers
    .filter((m) => m instanceof Trigger)
    .filter((t) => t.events.includes(event))
}
