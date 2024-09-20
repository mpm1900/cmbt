import { Modifier } from '../types'

export function validateModifiers(
  input: Modifier[],
  state: Modifier[] = []
): Modifier[] {
  return input.reduce<Modifier[]>((_modifiers, current) => {
    const modifiers = [..._modifiers, ...state]
    const matches = modifiers.filter((m) => m.key === current.key)
    if (
      current.maxInstances === undefined ||
      matches.length < current.maxInstances
    ) {
      return _modifiers.concat(current)
    }
    return _modifiers
  }, [])
}
