import { Modifier, Trigger } from '../types'

export function getNonTriggerModifiers(modifiers: Modifier[]): Modifier[] {
  return modifiers.filter((m) => !(m instanceof Trigger))
}
