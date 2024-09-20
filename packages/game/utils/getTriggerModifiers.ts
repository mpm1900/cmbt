import { Modifier, Trigger } from '../types'

export function getTriggerModifiers(modifiers: Modifier[]): Modifier[] {
  return modifiers.filter((m) => m instanceof Trigger)
}
