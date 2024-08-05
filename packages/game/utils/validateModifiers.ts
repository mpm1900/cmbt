import { Modifier } from '../types'

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
