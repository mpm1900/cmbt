import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Fireball, Protect } from '../../Actions'
import { FireballId, ProtectId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const FlameCultistId = nanoid()
export const FlameCultist: UnitBase = {
  id: FlameCultistId,
  name: 'Flame Cultist',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 60,
    defense: 60,
    magic: 100,
    speed: 90,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
  immunities: [],
}

export const FlameCultistConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: FireballId,
      make: (u) => new Fireball(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [FireballId, ProtectId],
}
