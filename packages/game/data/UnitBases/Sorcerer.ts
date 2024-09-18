import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  ACallBeyond,
  CallLightning,
  DragonBreath,
  Fireball,
  InfernalBlast,
  LightningBolt,
  MagicMissile,
  PowerWordKill,
  Protect,
} from '../Actions'
import { Scholar } from '../Augments'
import {
  ACallBeyondId,
  CallLightningId,
  DragonBreathId,
  FireballId,
  InfernalBlastId,
  LightningBoltId,
  MagicMissileId,
  PowerWordKillId,
  ProtectId,
  ScholarId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Sorcerer: UnitBase = {
  id: nanoid(),
  name: 'Sorcerer',
  stats: {
    ...BASE_UNIT.stats,
    health: 55,
    attack: 55,
    defense: 55,
    magic: 135,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [{ type: 'psychic', factor: 50 }],
}

export const SorcererConfig: UnitBaseConfig = {
  abilities: [Scholar],
  actionsCount: 6,
  actions: [
    {
      id: ACallBeyondId,
      make: (u) => new ACallBeyond(u.id, u.teamId),
    },
    {
      id: CallLightningId,
      make: (u) => new CallLightning(u.id, u.teamId),
    },
    {
      id: DragonBreathId,
      make: (u) => new DragonBreath(u.id, u.teamId),
    },
    {
      id: FireballId,
      make: (u) => new Fireball(u.id, u.teamId),
    },
    {
      id: InfernalBlastId,
      make: (u) => new InfernalBlast(u.id, u.teamId),
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
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: LightningBoltId,
      make: (u) => new LightningBolt(u.id, u.teamId),
    },
  ],
  defaultAbilityId: ScholarId,
  defaultActionIds: [
    CallLightningId,
    FireballId,
    MagicMissileId,
    PowerWordKillId,
    LightningBoltId,
  ],
}
