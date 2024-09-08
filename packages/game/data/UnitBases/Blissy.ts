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
    health: 250,
    attack: 7,
    defense: 7,
    magic: 105,
    speed: 50,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
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
