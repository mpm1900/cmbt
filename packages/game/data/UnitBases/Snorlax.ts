import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { BodySlam, Crunch, FirePunch, Rest } from '../Actions'
import { BodySlamId, CrunchId, FirePunchId, RestId } from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Snorlax',
  stats: {
    ...ZERO_UNIT.stats,
    health: 160,
    physical: 110,
    defense: 65,
    magic: 85,
    speed: 61,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const SnorlaxConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: BodySlamId,
      make: (u) => new BodySlam(u.id, u.teamId),
    },
    {
      id: CrunchId,
      make: (u) => new Crunch(u.id, u.teamId),
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
  defaultAbilityId: undefined,
  defaultActionIds: [BodySlamId, CrunchId, FirePunchId, RestId],
}
