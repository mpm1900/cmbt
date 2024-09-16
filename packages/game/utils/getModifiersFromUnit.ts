import { Modifier, Unit } from '../types'

export function getModifiersFromUnit(unit: Unit): Modifier[] {
  return [
    ...unit.modifiers(),
    ...unit.abilities.flatMap((a) => a.modifiers(unit)),
    ...unit.augments.flatMap((a) => a.modifiers(unit)),
  ].sort((a, b) => a.priority - b.priority)
}
