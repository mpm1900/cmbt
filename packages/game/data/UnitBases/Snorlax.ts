import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  BattleStance,
  BodySlam,
  FirePunch,
  PiercingStrike,
  PowerSwap,
  Protect,
  Rest,
  Taunt,
} from '../Actions'
import { Intoxicate } from '../Actions/Intoxicate'
import { Insulated } from '../Augments'
import {
  BodySlamId,
  ElixirOfPowerId,
  FirePunchId,
  InsulatedId,
  IntoxicateId,
  PiercingStrikeId,
  PowerSwapId,
  ProtectId,
  RestId,
  TauntId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Drunken Juggernaut',
  stats: {
    ...BASE_UNIT.stats,
    health: 160,
    attack: 110,
    defense: 95,
    magic: 80,
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

export const SnorlaxConfig: UnitBaseConfig = {
  abilities: [Insulated],
  actionsCount: 5,
  actions: [
    {
      id: ElixirOfPowerId,
      make: (u) => new BattleStance(u.id, u.teamId),
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
      id: PowerSwapId,
      make: (u) => new PowerSwap(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: RestId,
      make: (u) => new Rest(u.id, u.teamId),
    },
    {
      id: TauntId,
      make: (u) => new Taunt(u.id, u.teamId),
    },
  ],
  defaultAbilityId: InsulatedId,
  defaultActionIds: [BodySlamId, FirePunchId, IntoxicateId, ProtectId, RestId],
}
