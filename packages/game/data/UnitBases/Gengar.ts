import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Disable,
  Fireball,
  MagicMissile,
  PowerWordKill,
  Protect,
  Thunderbolt,
  TimeBend,
  WillOWisp,
} from '../Actions'
import { MindShatter } from '../Actions/MindShatter'
import { Scholar } from '../Augments'
import {
  DisableId,
  FireballId,
  MagicMissileId,
  MindShatterId,
  PowerWordKillId,
  ProtectId,
  ScholarId,
  ThunderboltId,
  TimeBendId,
  WillOWispId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Gengar: UnitBase = {
  id: nanoid(),
  name: 'Wizard',
  stats: {
    ...BASE_UNIT.stats,
    health: 60,
    attack: 55,
    defense: 55,
    magic: 140,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [{ type: 'force', factor: 25 }],
}

export const GengarConfig: UnitBaseConfig = {
  abilities: [Scholar],
  actionsCount: 6,
  actions: [
    {
      id: DisableId,
      make: (u) => new Disable(u.id, u.teamId),
    },
    {
      id: FireballId,
      make: (u) => new Fireball(u.id, u.teamId),
    },
    {
      id: MagicMissileId,
      make: (u) => new MagicMissile(u.id, u.teamId),
    },
    {
      id: MindShatterId,
      make: (u) => new MindShatter(u.id, u.teamId),
    },
    {
      id: PowerWordKillId,
      make: (u) => new PowerWordKill(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: ThunderboltId,
      make: (u) => new Thunderbolt(u.id, u.teamId),
    },
    {
      id: TimeBendId,
      make: (u) => new TimeBend(u.id, u.teamId),
    },
    {
      id: WillOWispId,
      make: (u) => new WillOWisp(u.id, u.teamId),
    },
  ],
  defaultAbilityId: ScholarId,
  defaultActionIds: [
    FireballId,
    MagicMissileId,
    MindShatterId,
    PowerWordKillId,
    ThunderboltId,
  ],
}
