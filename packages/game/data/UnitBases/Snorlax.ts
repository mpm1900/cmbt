import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Snorlax',
  stats: {
    ...ZERO_UNIT.stats,
    health: 430,
    physical: 110,
    defense: 65,
    magic: 85,
    speed: 61,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const SnorlaxConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultActionIds: [],
}
