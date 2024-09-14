import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Bless,
  Protect,
  SearingLight,
  Taunt,
  VampiricTouch,
} from '../Actions'
import { HoldPerson } from '../Actions/HoldPerson'
import { DivineHealing } from '../Augments'
import {
  BaneId,
  BlessId,
  DivineHealingId,
  HoldPersonId,
  ProtectId,
  SearingLightId,
  TauntId,
  VampiricTouchId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Cleric: UnitBase = {
  id: nanoid(),
  name: 'Cleric',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 55,
    defense: 100,
    magic: 100,
    speed: 65,

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

export const ClericConfig: UnitBaseConfig = {
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
      id: HoldPersonId,
      make: (u) => new HoldPerson(u.id, u.teamId),
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
      id: TauntId,
      make: (u) => new Taunt(u.id, u.teamId),
    },
    {
      id: VampiricTouchId,
      make: (u) => new VampiricTouch(u.id, u.teamId),
    },
  ],
  defaultAbilityId: DivineHealingId,
  defaultActionIds: [BaneId, BlessId, HoldPersonId, ProtectId],
}
