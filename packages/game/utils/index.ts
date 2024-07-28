import { Modifier, Trigger, TriggerEvent } from '../types'

export * from './applyModifiers'
export * from './calculateDamage'
export * from './getActionableUnits'
export * from './getActionData'
export * from './getBestAiAction'
export * from './getModifiersFromUnit'
export * from './getPermutations'
export * from './isUnitAlive'
export * from './makeUnit'
export * from './parseSuccess'
export * from './rollThreshold'

export function getTriggersByEvent(
  modifiers: Modifier[],
  event: TriggerEvent
): Trigger[] {
  return modifiers
    .filter((m) => m instanceof Trigger)
    .filter((t) => t.events.includes(event))
}

export function getModifiersByKey(
  modifiers: Modifier[]
): Record<string, Modifier[]> {
  return modifiers.reduce<Record<string, Modifier[]>>((result, modifier) => {
    if (result[modifier.key]) {
      result[modifier.key].push(modifier)
    } else {
      result[modifier.key] = [modifier]
    }
    return result
  }, {})
}

export function getNonTriggerModifiers(modifiers: Modifier[]): Modifier[] {
  return modifiers.filter((m) => !(m instanceof Trigger))
}

export function validateModifiers(
  input: Modifier[],
  state: Modifier[]
): Modifier[] {
  return input.reduce<Modifier[]>((modifiers, current) => {
    const matches = modifiers.filter((m) => m.key === current.key)
    if (
      current.maxInstances === undefined ||
      matches.length < current.maxInstances
    )
      return modifiers.concat(current)
    return modifiers
  }, state)
}
