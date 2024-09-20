import { ALL_BASES } from '../data'
import { Unit } from '../types'
import { getBaseStatValue } from './getBaseStatValue'

export function rebuildUnit(unit: Unit): Unit {
  const base = ALL_BASES.find((b) => b.id === unit.baseId)
  if (!base) return unit
  return {
    ...unit,
    stats: {
      ...unit.stats,
      health: getBaseStatValue('health', base.stats.health, unit.level),
      attack: getBaseStatValue('attack', base.stats.attack, unit.level),
      defense: getBaseStatValue('defense', base.stats.defense, unit.level),
      magic: getBaseStatValue('magic', base.stats.magic, unit.level),
      speed: getBaseStatValue('speed', base.stats.speed, unit.level),
    },
  }
}
