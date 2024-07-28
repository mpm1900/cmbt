import { Modifier, Unit } from '../types'

export function getModifiersFromUnit(unit: Unit): Modifier[] {
  return [...unit.modifiers()]
}
