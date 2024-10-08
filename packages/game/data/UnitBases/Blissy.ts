import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Block,
  NegateArmor,
  PoisonSpray,
  Protect,
  Spikes,
  Ward,
} from '../Actions'
import { DivineHealing } from '../Augments'
import {
  BlockId,
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
    magic: 50,
    magicDefense: 100,
    speed: 55,
    memory: 5,

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
  immunities: [],
}

export const BlissyConfig: UnitBaseConfig = {
  abilities: [DivineHealing],
  actions: [
    {
      id: BlockId,
      make: (u) => new Block(u.id, u.teamId),
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
  defaultActionIds: [BlockId, PoisonSprayId, ProtectId, SpikesId, WardId],
}
