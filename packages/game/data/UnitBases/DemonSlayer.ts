import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  LightningBolt,
  PiercingStrike,
  QuickAttack,
  RetreatingBlow,
  Slash,
  SwordsDance,
} from '../Actions'
import {
  LightningBoltId,
  PiercingStrikeId,
  QuickAttackId,
  RetreatingBlowId,
  SlashId,
  SwordsDanceId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const DemonSlayer: UnitBase = {
  id: nanoid(),
  name: 'Demon Slayer',
  stats: {
    ...BASE_UNIT.stats,
    health: 80,
    attack: 120,
    defense: 60,
    magic: 75,
    speed: 145,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const TempestKnightConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: LightningBoltId,
      make: (unit) => new LightningBolt(unit.id, unit.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (unit) => new PiercingStrike(unit.id, unit.teamId),
    },
    {
      id: QuickAttackId,
      make: (unit) => new QuickAttack(unit.id, unit.teamId),
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
