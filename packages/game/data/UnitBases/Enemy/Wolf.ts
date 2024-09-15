import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Bite } from '../../Actions'
import { BiteId } from '../../Ids'
import { Beast } from '../../Tags'
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
    magic: 50,
    speed: 70,

    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  tags: [Beast],
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
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [BiteId],
}
