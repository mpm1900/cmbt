import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Bless,
  Boast,
  DispelMagic,
  GuidingRay,
  HealingPrayer,
  HealingWord,
  HealSelf,
  Protect,
  SearingLight,
  VampiricTouch,
} from '../Actions'
import { HoldCreature } from '../Actions/HoldCreature'
import { DivineHealing } from '../Augments'
import {
  BaneId,
  BlessId,
  BoastId,
  DispelMagicId,
  DivineHealingId,
  GuidingRayId,
  HealingPrayerId,
  HealingWordId,
  HealSelfId,
  HoldCreatureId,
  ProtectId,
  SearingLightId,
  VampiricTouchId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Cleric: UnitBase = {
  id: nanoid(),
  name: 'Cleric',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 70,
    defense: 100,
    magic: 100,
    magicDefense: 115,
    speed: 65,
    memory: 5,

    focus: 40,
    stamina: 30,
    devotion: 20,

    xpMultiplier: 70,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [{ type: 'holy', factor: 50 }],
  resistances: [{ type: 'holy', factor: 50 }],
  weaknesses: [],
  immunities: [],
}

export const ClericConfig: UnitBaseConfig = {
  abilities: [DivineHealing],
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
      id: DispelMagicId,
      make: (u) => new DispelMagic(u.id, u.teamId),
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
      id: HealSelfId,
      make: (u) => new HealSelf(u.id, u.teamId),
    },
    {
      id: HoldCreatureId,
      make: (u) => new HoldCreature(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: SearingLightId,
      make: (u) => new SearingLight(u.id, u.teamId),
    },
    {
      id: BoastId,
      make: (u) => new Boast(u.id, u.teamId),
    },
    {
      id: VampiricTouchId,
      make: (u) => new VampiricTouch(u.id, u.teamId),
    },
  ],
  defaultAbilityId: DivineHealingId,
  defaultActionIds: [
    BaneId,
    HealingPrayerId,
    GuidingRayId,
    SearingLightId,
    VampiricTouchId,
  ],
}
