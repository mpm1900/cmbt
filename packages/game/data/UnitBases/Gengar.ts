import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Gengar: UnitBase = {
  id: nanoid(),
  name: 'Gengar',
  stats: {
    ...ZERO_UNIT.stats,
    health: 220,
    physical: 55,
    defense: 55,
    magic: 135,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const GengarConfig: UnitBaseConfig = {
  actionsCount: 4,
  actions: [],
  defaultActionIds: [],
}
