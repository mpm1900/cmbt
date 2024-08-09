import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'
import { Rest, RestId } from '../Actions'

export const Snorlax: UnitBase = {
  id: nanoid(),
  name: 'Snorlax',
  stats: {
    ...ZERO_UNIT.stats,
    health: 430,
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
      id: RestId,
      make: (u) => new Rest(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [RestId],
}
