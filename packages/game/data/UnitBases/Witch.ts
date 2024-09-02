import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Disable, PoisonSpray, Protect, TrickRoom } from '../Actions'
import { HoldPerson } from '../Actions/HoldPerson'
import { Regeneration } from '../Augments'
import {
  DisableId,
  HoldPersonId,
  PoisonSprayId,
  ProtectId,
  RegenerationId,
  TrickRoomId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Witch: UnitBase = {
  id: nanoid(),
  name: 'Witch',
  stats: {
    ...BASE_UNIT.stats,
    health: 120,
    attack: 50,
    defense: 70,
    magic: 100,
    speed: 30,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const WitchConfig: UnitBaseConfig = {
  abilities: [Regeneration],
  actionsCount: 5,
  actions: [
    {
      id: DisableId,
      make: (u) => new Disable(u.id, u.teamId),
    },
    {
      id: HoldPersonId,
      make: (u) => new HoldPerson(u.id, u.teamId),
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
      id: TrickRoomId,
      make: (u) => new TrickRoom(u.id, u.teamId),
    },
  ],
  defaultAbilityId: RegenerationId,
  defaultActionIds: [
    DisableId,
    HoldPersonId,
    PoisonSprayId,
    ProtectId,
    TrickRoomId,
  ],
}
