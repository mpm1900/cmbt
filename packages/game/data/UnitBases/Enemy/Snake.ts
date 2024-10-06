import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Bite } from '../../Actions'
import { TallGrass } from '../../Augments'
import { BiteId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const SnakeId = nanoid()
export const Snake: UnitBase = {
  id: SnakeId,
  name: 'Snake',
  stats: {
    ...BASE_UNIT.stats,
    health: 50,
    attack: 80,
    defense: 45,
    magic: 45,
    magicDefense: 50,
    speed: 160,
    memory: 5,

    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
  immunities: [],
}

export const SnakeConfig: UnitBaseConfig = {
  abilities: [TallGrass],
  actions: [
    {
      id: BiteId,
      make: (u) => new Bite(u.id, u.teamId),
    },
  ],
  defaultAbilityId: TallGrass.id,
  defaultActionIds: [BiteId],
}
