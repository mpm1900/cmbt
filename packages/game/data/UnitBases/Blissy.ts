import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  ArmorUp,
  NegateArmor,
  PoisonSpray,
  Protect,
  Spikes,
  Ward,
} from '../Actions'
import { DivineHealing } from '../Augments'
import {
  ArmorUpId,
  DivineHealingId,
  NegateArmorId,
  PoisonSprayId,
  ProtectId,
  SpikesId,
  WardId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Blissy: UnitBase = {
  id: nanoid(),
  name: 'Prophet',
  stats: {
    ...BASE_UNIT.stats,
    health: 255,
    attack: 10,
    defense: 10,
    magic: 100,
    speed: 55,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [
    { type: 'arcane', factor: 100 / 3 },
    { type: 'psychic', factor: 100 / 3 },
    { type: 'holy', factor: 100 / 2 },
  ],
  weaknesses: [],
}

export const BlissyConfig: UnitBaseConfig = {
  abilities: [DivineHealing],
  actionsCount: 5,
  actions: [
    {
      id: ArmorUpId,
      make: (u) => new ArmorUp(u.id, u.teamId),
    },
    {
      id: NegateArmorId,
      make: (u) => new NegateArmor(u.id, u.teamId),
    },
    {
      id: PoisonSprayId,
      make: (u) => new PoisonSpray(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: SpikesId,
      make: (u) => new Spikes(u.id, u.teamId),
    },
    {
      id: WardId,
      make: (u) => new Ward(u.id, u.teamId),
    },
  ],
  defaultAbilityId: DivineHealingId,
  defaultActionIds: [ArmorUpId, PoisonSprayId, ProtectId, SpikesId, WardId],
}
