import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Boast,
  ChillingGrasp,
  DeathRites,
  DispelMagic,
  MemoryLeak,
  PoisonSpray,
  Protect,
  SongOfRuin,
  TrickRoom,
  VampiricTouch,
} from '../Actions'
import { HoldPerson } from '../Actions/HoldPerson'
import { Regeneration } from '../Augments'
import {
  BaneId,
  BoastId,
  ChillingGraspId,
  DeathRitesId,
  DispelMagicId,
  HoldPersonId,
  MemoryLeakId,
  PoisonSprayId,
  ProtectId,
  RegenerationId,
  SongOfRuinId,
  TrickRoomId,
  VampiricTouchId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Witch: UnitBase = {
  id: nanoid(),
  name: 'Shaman',
  stats: {
    ...BASE_UNIT.stats,
    health: 130,
    attack: 40,
    defense: 70,
    magic: 85,
    speed: 50,

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

export const WitchConfig: UnitBaseConfig = {
  abilities: [Regeneration],
  actionsCount: 5,
  actions: [
    {
      id: BaneId,
      make: (u) => new Bane(u.id, u.teamId),
    },
    {
      id: BoastId,
      make: (u) => new Boast(u.id, u.teamId),
    },
    {
      id: ChillingGraspId,
      make: (u) => new ChillingGrasp(u.id, u.teamId),
    },
    {
      id: DeathRitesId,
      make: (u) => new DeathRites(u.id, u.teamId),
    },
    {
      id: DispelMagicId,
      make: (u) => new DispelMagic(u.id, u.teamId),
    },
    {
      id: HoldPersonId,
      make: (u) => new HoldPerson(u.id, u.teamId),
    },
    {
      id: MemoryLeakId,
      make: (u) => new MemoryLeak(u.id, u.teamId),
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
      id: SongOfRuinId,
      make: (u) => new SongOfRuin(u.id, u.teamId),
    },
    {
      id: TrickRoomId,
      make: (u) => new TrickRoom(u.id, u.teamId),
    },
    {
      id: VampiricTouchId,
      make: (u) => new VampiricTouch(u.id, u.teamId),
    },
  ],
  defaultAbilityId: RegenerationId,
  defaultActionIds: [
    BaneId,
    MemoryLeakId,
    HoldPersonId,
    PoisonSprayId,
    ProtectId,
  ],
}
