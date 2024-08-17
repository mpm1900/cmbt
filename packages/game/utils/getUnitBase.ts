import { ALL_BASES, BASE_CONFIGS } from '../data'
import { Id } from '../types'

export function getUnitBase(id: Id) {
  const base = ALL_BASES.find((base) => base.id === id)
  const config = BASE_CONFIGS[id]

  return {
    base,
    config,
  }
}
