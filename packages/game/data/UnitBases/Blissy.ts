import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Blissy: UnitBase = {
  id: nanoid(),
  name: 'Blissy',
  stats: {
    ...ZERO_UNIT.stats,
    health: 620,
    physical: 10,
    defense: 10,
    magic: 80,
    speed: 55,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const BlissyConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultAbilityId: undefined,
  defaultActionIds: [],
}
