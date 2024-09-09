import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  PiercingStrike,
  QuickAttack,
  Slash,
  SwordsDance,
  Thunderbolt,
} from '../Actions'
import {
  PiercingStrikeId,
  QuickAttackId,
  SlashId,
  SwordsDanceId,
  ThunderboltId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const TempestKnight: UnitBase = {
  id: nanoid(),
  name: 'Tempest',
  stats: {
    ...BASE_UNIT.stats,
    health: 88,
    attack: 120,
    defense: 70,
    magic: 75,
    speed: 142,

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
      id: PiercingStrikeId,
      make: (unit) => new PiercingStrike(unit.id, unit.teamId),
    },
    {
      id: QuickAttackId,
      make: (unit) => new QuickAttack(unit.id, unit.teamId),
    },
    {
      id: SlashId,
      make: (unit) => new Slash(unit.id, unit.teamId),
    },
    {
      id: SwordsDanceId,
      make: (unit) => new SwordsDance(unit.id, unit.teamId),
    },
    {
      id: ThunderboltId,
      make: (unit) => new Thunderbolt(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [PiercingStrikeId, SlashId, SwordsDanceId, ThunderboltId],
}
