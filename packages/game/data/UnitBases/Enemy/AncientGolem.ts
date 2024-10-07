import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { BodySlam, Earthquake, Protect } from '../../Actions'
import { BodySlamId, EarthquakeId, ProtectId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const AncientGolemId = nanoid()
export const AncientGolem: UnitBase = {
  id: AncientGolemId,
  name: 'Ancient Golem',
  stats: {
    ...BASE_UNIT.stats,
    health: 130,
    attack: 160,
    defense: 110,
    magic: 80,
    magicDefense: 110,
    speed: 90,
    memory: 5,

    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [{ type: 'force', factor: 50 }],
  resistances: [
    { type: 'force', factor: 50 },
    { type: 'blight', factor: 50 },
  ],
  weaknesses: [{ type: 'shock', factor: 50 }],
  immunities: [],
}

export const AncientGolemConfig: UnitBaseConfig = {
  abilities: [],

  actions: [
    {
      id: BodySlamId,
      make: (u) => new BodySlam(u.id, u.teamId),
    },
    {
      id: EarthquakeId,
      make: (u) => new Earthquake(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [BodySlamId, EarthquakeId, ProtectId],
}
