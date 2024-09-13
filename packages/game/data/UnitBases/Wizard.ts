import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Disable,
  Fireball,
  GhostFlame,
  LightningBolt,
  MagicMissile,
  PowerWordKill,
  Protect,
  TimeBend,
} from '../Actions'
import { MindShatter } from '../Actions/MindShatter'
import { Scholar } from '../Augments'
import {
  DisableId,
  FireballId,
  GhostFlameId,
  LightningBoltId,
  MagicMissileId,
  MindShatterId,
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
    MindShatterId,
    PowerWordKillId,
    LightningBoltId,
  ],
}
