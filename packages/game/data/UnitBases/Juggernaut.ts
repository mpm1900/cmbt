import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Block,
  Boast,
  BodySlam,
  ElixirOfPower,
  FirePunch,
  PiercingStrike,
  PowerSink,
  Protect,
  Rest,
} from '../Actions'
import { Intoxicate } from '../Actions/Intoxicate'
import { Insulated } from '../Augments'
import {
  BlockId,
  BoastId,
  BodySlamId,
  ElixirOfPowerId,
  FirePunchId,
  InsulatedId,
  IntoxicateId,
  PiercingStrikeId,
  PowerSinkId,
  ProtectId,
  RestId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Juggernaut: UnitBase = {
  id: nanoid(),
  name: 'Juggernaut',
  stats: {
    ...BASE_UNIT.stats,
    health: 160,
    attack: 110,
    defense: 75,
    magic: 65,
    magicDefense: 110,
    speed: 50,
    memory: 5,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
  immunities: [],
}

export const SnorlaxConfig: UnitBaseConfig = {
  abilities: [Insulated],
  actions: [
    {
      id: BlockId,
      make: (u) => new Block(u.id, u.teamId),
    },
    {
      id: BoastId,
      make: (u) => new Boast(u.id, u.teamId),
    },
    {
      id: ElixirOfPowerId,
      make: (u) => new ElixirOfPower(u.id, u.teamId),
    },
    {
      id: BodySlamId,
      make: (u) => new BodySlam(u.id, u.teamId),
    },
    {
      id: FirePunchId,
      make: (u) => new FirePunch(u.id, u.teamId),
    },
    {
      id: IntoxicateId,
      make: (u) => new Intoxicate(u.id, u.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: PowerSinkId,
      make: (u) => new PowerSink(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: RestId,
      make: (u) => new Rest(u.id, u.teamId),
    },
  ],
  defaultAbilityId: InsulatedId,
  defaultActionIds: [BodySlamId, FirePunchId, IntoxicateId, ProtectId, RestId],
}
