import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  ACallBeyond,
  Fireball,
  LightningBolt,
  MagicMissile,
  MemoryLeak,
  MindBlast,
  MindShatter,
  PowerWordKill,
  Protect,
  PsyStab,
  TimeBend,
  Ward,
} from '../Actions'
import { MindTwist } from '../Actions/MindTwist'
import { Scholar } from '../Augments'
import {
  ACallBeyondId,
  FireballId,
  LightningBoltId,
  MagicMissileId,
  MemoryLeakId,
  MindBlastId,
  MindShatterId,
  MindTwistId,
  PowerWordKillId,
  ProtectId,
  PsyStabId,
  ScholarId,
  TimeBendId,
  WardId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Wizard: UnitBase = {
  id: nanoid(),
  name: 'Wizard',
  stats: {
    ...BASE_UNIT.stats,
    health: 50,
    attack: 60,
    defense: 90,
    magic: 140,
    magicDefense: 125,
    speed: 105,
    memory: 6,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [
    {
      type: 'arcane',
      factor: 25,
    },
  ],
  weaknesses: [
    { type: 'force', factor: 25 },
    { type: 'psychic', factor: 50 },
  ],
  immunities: [],
}

export const WizardConfig: UnitBaseConfig = {
  abilities: [Scholar],
  actions: [
    {
      id: ACallBeyondId,
      make: (u) => new ACallBeyond(u.id, u.teamId),
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
      id: MemoryLeakId,
      make: (u) => new MemoryLeak(u.id, u.teamId),
    },
    {
      id: MindBlastId,
      make: (u) => new MindBlast(u.id, u.teamId),
    },
    {
      id: MindShatterId,
      make: (u) => new MindShatter(u.id, u.teamId),
    },
    {
      id: MindTwistId,
      make: (u) => new MindTwist(u.id, u.teamId),
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
      id: PsyStabId,
      make: (u) => new PsyStab(u.id, u.teamId),
    },
    {
      id: LightningBoltId,
      make: (u) => new LightningBolt(u.id, u.teamId),
    },
    {
      id: TimeBendId,
      make: (u) => new TimeBend(u.id, u.teamId),
    },
    {
      id: WardId,
      make: (u) => new Ward(u.id, u.teamId),
    },
  ],
  defaultAbilityId: ScholarId,
  defaultActionIds: [
    FireballId,
    MagicMissileId,
    MindTwistId,
    PowerWordKillId,
    LightningBoltId,
  ],
}
