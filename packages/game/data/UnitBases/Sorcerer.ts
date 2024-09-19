import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  ACallBeyond,
  BecomeTheStorm,
  CallLightning,
  ChainLightning,
  DragonBreath,
  Fireball,
  InfernalBlast,
  LightningBolt,
  MagicMissile,
  PowerWordKill,
  Protect,
  Ward,
  WindWalk,
} from '../Actions'
import { Scholar } from '../Augments'
import {
  ACallBeyondId,
  BecomeTheStormId,
  CallLightningId,
  ChainLightningId,
  DragonBreathId,
  FireballId,
  InfernalBlastId,
  LightningBoltId,
  MagicMissileId,
  PowerWordKillId,
  ProtectId,
  ScholarId,
  WardId,
  WindWalkId,
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
  affinities: [
    { type: 'fire', factor: 25 },
    { type: 'shock', factor: 25 },
  ],
  resistances: [],
  weaknesses: [{ type: 'psychic', factor: 50 }],
  immunities: [],
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
      id: BecomeTheStormId,
      make: (u) => new BecomeTheStorm(u.id, u.teamId),
    },
    {
      id: CallLightningId,
      make: (u) => new CallLightning(u.id, u.teamId),
    },
    {
      id: ChainLightningId,
      make: (u) => new ChainLightning(u.id, u.teamId),
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
    {
      id: WardId,
      make: (u) => new Ward(u.id, u.teamId),
    },
    {
      id: WindWalkId,
      make: (u) => new WindWalk(u.id, u.teamId),
    },
  ],
  defaultAbilityId: ScholarId,
  defaultActionIds: [
    CallLightningId,
    ChainLightningId,
    FireballId,
    MagicMissileId,
    PowerWordKillId,
    LightningBoltId,
  ],
}
