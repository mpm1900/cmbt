import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Hide,
  LightningBolt,
  PiercingStrike,
  RapidStrike,
  RetreatingBlow,
  Slash,
  SneakAttack,
  SwordsDance,
} from '../Actions'
import {
  HideId,
  LightningBoltId,
  PiercingStrikeId,
  RapidStrikeId,
  RetreatingBlowId,
  SlashId,
  SneakAttackId,
  SwordsDanceId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const DemonSlayer: UnitBase = {
  id: nanoid(),
  name: 'Demon Slayer',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 120,
    defense: 60,
    magic: 60,
    speed: 130,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
  immunities: [],
}

export const TempestKnightConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: HideId,
      make: (u) => new Hide(u.id, u.teamId),
    },
    {
      id: LightningBoltId,
      make: (unit) => new LightningBolt(unit.id, unit.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (unit) => new PiercingStrike(unit.id, unit.teamId),
    },
    {
      id: RapidStrikeId,
      make: (unit) => new RapidStrike(unit.id, unit.teamId),
    },
    {
      id: RetreatingBlowId,
      make: (u) => new RetreatingBlow(u.id, u.teamId),
    },
    {
      id: SlashId,
      make: (unit) => new Slash(unit.id, unit.teamId),
    },
    {
      id: SneakAttackId,
      make: (u) => new SneakAttack(u.id, u.teamId),
    },
    {
      id: SwordsDanceId,
      make: (unit) => new SwordsDance(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [
    LightningBoltId,
    PiercingStrikeId,
    RetreatingBlowId,
    SlashId,
    SwordsDanceId,
  ],
}
