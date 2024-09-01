import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const DeoxysS: UnitBase = {
  id: nanoid(),
  name: 'Deoxys-S',
  stats: {
    ...BASE_UNIT.stats,
    health: 50,
    physical: 85,
    defense: 85,
    magic: 90,
    speed: 180,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const DeoxysSConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultAbilityId: undefined,
  defaultActionIds: [],
}
