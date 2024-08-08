import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const DeoxysS: UnitBase = {
  id: nanoid(),
  name: 'Deoxys-S',
  stats: {
    ...ZERO_UNIT.stats,
    health: 210,
    physical: 85,
    defense: 85,
    magic: 90,
    speed: 180,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const DeoxysSConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultAbilityId: undefined,
  defaultActionIds: [],
}
