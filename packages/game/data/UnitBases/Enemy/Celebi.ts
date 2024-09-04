import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { PiercingStrike, Protect } from '../../Actions'
import { PiercingStrikeId, ProtectId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const CelebiId = nanoid()
export const Celebi: UnitBase = {
  id: CelebiId,
  name: 'Death Knight',
  stats: {
    ...BASE_UNIT.stats,
    health: 100,
    attack: 100,
    defense: 100,
    magic: 100,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
}

export const CelebiConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
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
