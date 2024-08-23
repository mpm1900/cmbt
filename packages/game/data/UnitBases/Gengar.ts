import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Disable, MagicMissile, PowerWordKill, WillOWisp } from '../Actions'
import { Scholar } from '../Augments'
import {
  DisableId,
  MagicMissileId,
  PowerWordKillId,
  ScholarId,
  WillOWispId,
} from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Gengar: UnitBase = {
  id: nanoid(),
  name: 'Wizard',
  stats: {
    ...ZERO_UNIT.stats,
    health: 60,
    physical: 55,
    defense: 55,
    magic: 140,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 5,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const GengarConfig: UnitBaseConfig = {
  abilities: [Scholar],
  actionsCount: 4,
  actions: [
    {
      id: DisableId,
      make: (u) => new Disable(u.id, u.teamId),
    },
    {
      id: MagicMissileId,
      make: (u) => new MagicMissile(u.id, u.teamId),
    },
    {
      id: PowerWordKillId,
      make: (u) => new PowerWordKill(u.id, u.teamId),
    },
    {
      id: WillOWispId,
      make: (u) => new WillOWisp(u.id, u.teamId),
    },
  ],
  defaultAbilityId: ScholarId,
  defaultActionIds: [DisableId, MagicMissileId, PowerWordKillId, WillOWispId],
}
