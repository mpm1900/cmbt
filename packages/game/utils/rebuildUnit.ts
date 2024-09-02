import { ALL_BASES } from '../data'
import { Unit } from '../types'
import { mapBaseStat } from './mapBaseStat'

export function rebuildUnit(unit: Unit): Unit {
  const base = ALL_BASES.find((b) => b.id === unit.baseId)
  if (!base) return unit
  return {
    ...unit,
    // TODO : level exp stuff
    stats: {
      ...unit.stats,
      health: mapBaseStat('health', base.stats.health, unit.level),
      attack: mapBaseStat('attack', base.stats.attack, unit.level),
      defense: mapBaseStat('defense', base.stats.defense, unit.level),
      magic: mapBaseStat('magic', base.stats.magic, unit.level),
      speed: mapBaseStat('speed', base.stats.speed, unit.level),
    },
  }
}
