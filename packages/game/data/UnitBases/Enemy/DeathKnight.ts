import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { PiercingStrike, Protect } from '../../Actions'
import { PiercingStrikeId, ProtectId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const DeathKnightId = nanoid()
export const DeathKnight: UnitBase = {
  id: DeathKnightId,
  name: 'Death Knight',
  stats: {
    ...BASE_UNIT.stats,
    health: 100,
    attack: 100,
    defense: 100,
    magic: 100,
    magicDefense: 100,
    speed: 95,
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

export const DeathKnightConfig: UnitBaseConfig = {
  abilities: [],
  actions: [
    {
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [PiercingStrikeId, ProtectId],
}
