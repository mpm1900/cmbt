import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Bite, WillOWisp } from '../../Actions'
import { BiteId, WillOWispId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const WolfId = nanoid()
export const Wolf: UnitBase = {
  id: WolfId,
  name: 'Wolf',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 90,
    defense: 70,
    magic: 60,
    speed: 70,

    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const WolfConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: BiteId,
      make: (u) => new Bite(u.id, u.teamId),
    },
    {
      id: WillOWispId,
      make: (u) => new WillOWisp(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [BiteId, WillOWispId],
}
