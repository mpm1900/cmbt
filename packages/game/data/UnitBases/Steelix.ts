import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Steelix: UnitBase = {
  id: nanoid(),
  name: 'Steelix',
  stats: {
    ...ZERO_UNIT.stats,
    health: 75,
    physical: 85,
    defense: 230,
    magic: 55,
    speed: 30,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const SteelixConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [],
  defaultAbilityId: undefined,
  defaultActionIds: [],
}
