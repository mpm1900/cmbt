import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Bless,
  Block,
  Boast,
  GuidingRay,
  HealingPrayer,
  HealingWord,
  Protect,
  RetreatingBlow,
  SearingLight,
  Slash,
  Smite,
} from '../Actions'
import { HoldPerson } from '../Actions/HoldPerson'
import { DivineHealing } from '../Augments'
import {
  BaneId,
  BlessId,
  BlockId,
  BoastId,
  DivineHealingId,
  GuidingRayId,
  HealingPrayerId,
  HealingWordId,
  HoldPersonId,
  ProtectId,
  RetreatingBlowId,
  SearingLightId,
  SlashId,
  SmiteId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Paladin: UnitBase = {
  id: nanoid(),
  name: 'Paladin',
  stats: {
    ...BASE_UNIT.stats,
    health: 125,
    attack: 100,
    defense: 95,
    magic: 100,
    speed: 60,

    focus: 40,
    stamina: 30,
    devotion: 20,

    xpMultiplier: 70,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const PaladinConfig: UnitBaseConfig = {
  abilities: [DivineHealing],
  actionsCount: 5,
  actions: [
    {
      id: BaneId,
      make: (u) => new Bane(u.id, u.teamId),
    },
    {
      id: BlessId,
      make: (u) => new Bless(u.id, u.teamId),
    },
    {
      id: BlockId,
      make: (u) => new Block(u.id, u.teamId),
    },
    {
      id: BoastId,
      make: (u) => new Boast(u.id, u.teamId),
    },
    {
      id: GuidingRayId,
      make: (u) => new GuidingRay(u.id, u.teamId),
    },
    {
      id: HealingPrayerId,
      make: (u) => new HealingPrayer(u.id, u.teamId),
    },
    {
      id: HealingWordId,
      make: (u) => new HealingWord(u.id, u.teamId),
    },
    {
      id: HoldPersonId,
      make: (u) => new HoldPerson(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: RetreatingBlowId,
      make: (u) => new RetreatingBlow(u.id, u.teamId),
    },
    {
      id: SearingLightId,
      make: (u) => new SearingLight(u.id, u.teamId),
    },
    {
      id: SlashId,
      make: (u) => new Slash(u.id, u.teamId),
    },
    {
      id: SmiteId,
      make: (u) => new Smite(u.id, u.teamId),
    },
  ],
  defaultAbilityId: DivineHealingId,
  defaultActionIds: [BaneId, BlessId, HoldPersonId, GuidingRayId, SmiteId],
}
