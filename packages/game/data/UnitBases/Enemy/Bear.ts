import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Protect, Slash } from '../../Actions'
import { ProtectId, SlashId } from '../../Ids'
import { Beast } from '../../Tags'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const BearId = nanoid()
export const Bear: UnitBase = {
  id: BearId,
  name: 'Bear',
  stats: {
    ...BASE_UNIT.stats,
    health: 90,
    attack: 130,
    defense: 75,
    magic: 20,
    magicDefense: 80,
    speed: 75,
    memory: 5,

    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  tags: [Beast],
  augmentSlots: 3,
  affinities: [],
  resistances: [{ type: 'force', factor: 25 }],
  weaknesses: [],
  immunities: [],
}

export const BearConfig: UnitBaseConfig = {
  abilities: [],
  actions: [
    {
      id: SlashId,
      make: (u) => new Slash(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [SlashId, ProtectId],
}
