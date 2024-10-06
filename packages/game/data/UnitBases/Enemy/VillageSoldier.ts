import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { Protect, Slash } from '../../Actions'
import { ProtectId, SlashId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const VillageSoldierId = nanoid()
export const VillageSoldier: UnitBase = {
  id: VillageSoldierId,
  name: 'Village Soldier',
  stats: {
    ...BASE_UNIT.stats,
    health: 70,
    attack: 105,
    defense: 79,
    magic: 35,
    magicDefense: 55,
    speed: 76,
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

export const VillageSoldierConfig: UnitBaseConfig = {
  abilities: [],
  actions: [
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: SlashId,
      make: (u) => new Slash(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [ProtectId, SlashId],
}
