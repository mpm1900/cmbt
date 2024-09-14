import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Fireball,
  GhostFlame,
  LightningBolt,
  MagicMissile,
  MemoryLeak,
  MindBlast,
  PowerWordKill,
  Protect,
  TimeBend,
} from '../Actions'
import { MindTwist } from '../Actions/MindTwist'
import { Scholar } from '../Augments'
import {
  FireballId,
  GhostFlameId,
  LightningBoltId,
  MagicMissileId,
  MemoryLeakId,
  MindBlastId,
  MindTwistId,
  PowerWordKillId,
  ProtectId,
  ScholarId,
  TimeBendId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Wizard: UnitBase = {
  id: nanoid(),
  name: 'Wizard',
  stats: {
    ...BASE_UNIT.stats,
    health: 50,
    attack: 50,
    defense: 80,
    magic: 140,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [{ type: 'force', factor: 25 }],
}

export const WizardConfig: UnitBaseConfig = {
  abilities: [Scholar],
  actionsCount: 6,
  actions: [
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
      id: LightningBoltId,
      make: (u) => new LightningBolt(u.id, u.teamId),
    },
    {
      id: TimeBendId,
      make: (u) => new TimeBend(u.id, u.teamId),
    },
    {
      id: GhostFlameId,
      make: (u) => new GhostFlame(u.id, u.teamId),
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
