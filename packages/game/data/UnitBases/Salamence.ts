import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Salamence: UnitBase = {
  id: nanoid(),
  name: 'Salamence',
  stats: {
    ...ZERO_UNIT.stats,
    health: 300,
    physical: 95,
    defense: 80,
    magic: 110,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const SalamenceConfig: UnitBaseConfig = {
  actionsCount: 5,
  actions: [],
  defaultActionIds: [],
}
