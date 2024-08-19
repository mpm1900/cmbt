import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  ArmorUp,
  ArmorUpId,
  Protect,
  Spikes,
  SpikesId,
  Ward,
  WardId,
} from '../Actions'
import { ProtectId } from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Blissy: UnitBase = {
  id: nanoid(),
  name: 'Blissy',
  stats: {
    ...ZERO_UNIT.stats,
    health: 255,
    physical: 10,
    defense: 10,
    magic: 100,
    speed: 55,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const BlissyConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: ArmorUpId,
      make: (u) => new ArmorUp(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: SpikesId,
      make: (u) => new Spikes(u.id, u.teamId),
    },
    {
      id: WardId,
      make: (u) => new Ward(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [ArmorUpId, ProtectId, SpikesId, WardId],
}
