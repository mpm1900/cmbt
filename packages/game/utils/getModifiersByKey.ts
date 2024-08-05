import { Modifier } from '../types'

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
