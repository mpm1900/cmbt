import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'

export const DeoxysM: UnitBase = {
  id: nanoid(),
  name: 'Deoxys-M',
  stats: {
    ...ZERO_UNIT.stats,
    health: 210,
    physical: 50,
    defense: 50,
    magic: 150,
    speed: 120,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const DeoxysMConfig: UnitBaseConfig = {
  actionsCount: 5,
  actions: [],
  defaultActionIds: [],
}
