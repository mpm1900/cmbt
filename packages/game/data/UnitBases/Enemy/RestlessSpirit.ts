import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { GhostFlame, MagicMissile, Protect } from '../../Actions'
import { GhostFlameId, MagicMissileId, ProtectId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const RestlessSpiritId = nanoid()
export const RestlessSpirit: UnitBase = {
  id: RestlessSpiritId,
  name: 'Restless Spirit',
  stats: {
    ...BASE_UNIT.stats,
    health: 58,
    attack: 50,
    defense: 145,
    magic: 100,
    speed: 30,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [
    { type: 'blight', factor: 50 },
    { type: 'force', factor: 100 },
    { type: 'psychic', factor: 50 },
  ],
  weaknesses: [
    { type: 'holy', factor: 100 },
    { type: 'shock', factor: 33 },
  ],
}

export const RestlessSpiritConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: MagicMissileId,
      make: (u) => new MagicMissile(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: GhostFlameId,
      make: (u) => new GhostFlame(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [MagicMissileId, ProtectId, GhostFlameId],
}
