import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  BattleStance,
  BodySlam,
  FirePunch,
  PiercingStrike,
  PowerSwap,
  Rest,
  Taunt,
} from '../Actions'
import { FlameShield } from '../Augments'
import {
  BattleStanceId,
  BodySlamId,
  FirePunchId,
  FlameShieldId,
  PiercingStrikeId,
  PowerSwapId,
  RestId,
  TauntId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Tavern Master',
  stats: {
    ...BASE_UNIT.stats,
    health: 160,
    attack: 110,
    defense: 84,
    magic: 80,
    speed: 60,

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
  abilities: [FlameShield],
  actionsCount: 5,
  actions: [
    {
      id: BattleStanceId,
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
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: PowerSwapId,
      make: (u) => new PowerSwap(u.id, u.teamId),
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
  defaultAbilityId: FlameShieldId,
  defaultActionIds: [BattleStanceId, BodySlamId, FirePunchId, RestId],
}
