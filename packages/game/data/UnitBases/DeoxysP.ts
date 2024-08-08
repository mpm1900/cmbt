import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const DeoxysP: UnitBase = {
  id: nanoid(),
  name: 'Deoxys-P',
  stats: {
    ...ZERO_UNIT.stats,
    health: 210,
    physical: 180,
    defense: 20,
    magic: 20,
    speed: 150,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const DeoxysPConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultAbilityId: undefined,
  defaultActionIds: [],
}
