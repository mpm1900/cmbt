import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Protect } from '../Actions'
import { ProtectId } from '../Ids'
import { ZERO_UNIT } from '../Units'

export const CelebiId = nanoid()
export const Celebi: UnitBase = {
  id: CelebiId,
  name: 'Celebi',
  stats: {
    ...ZERO_UNIT.stats,
    health: 100,
    physical: 100,
    defense: 100,
    magic: 100,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const CelebiConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [ProtectId],
}
