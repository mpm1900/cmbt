import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { BodySlam, FirePunch, PiercingStrike, Rest } from '../Actions'
import { FlameShield } from '../Augments'
import {
  BodySlamId,
  FirePunchId,
  FlameShieldId,
  PiercingStrikeId,
  RestId,
} from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Tavern Master',
  stats: {
    ...ZERO_UNIT.stats,
    health: 160,
    physical: 110,
    defense: 84,
    magic: 80,
    speed: 61,

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
      id: BodySlamId,
      make: (u) => new BodySlam(u.id, u.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: FirePunchId,
      make: (u) => new FirePunch(u.id, u.teamId),
    },
    {
      id: RestId,
      make: (u) => new Rest(u.id, u.teamId),
    },
  ],
  defaultAbilityId: FlameShieldId,
  defaultActionIds: [BodySlamId, FirePunchId, PiercingStrikeId, RestId],
}
