import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const Celebi: UnitBase = {
  id: nanoid(),
  name: 'Celebi',
  stats: {
    ...ZERO_UNIT.stats,
    health: 310,
    physical: 100,
    defense: 100,
    magic: 100,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const CelebiConfig: UnitBaseConfig = {
  actionsCount: 5,
  actions: [],
  defaultActionIds: [],
}
