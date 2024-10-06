import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { GhostFlame, Protect, VampiricTouch } from '../../Actions'
import { GhostFlameId, ProtectId, VampiricTouchId } from '../../Ids'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const RestlessSpiritId = nanoid()
export const RestlessSpirit: UnitBase = {
  id: RestlessSpiritId,
  name: 'Restless Spirit',
  stats: {
    ...BASE_UNIT.stats,
    health: 58,
    attack: 50,
    defense: 145,
    magic: 100,
    magicDefense: 100,
    speed: 30,
    memory: 5,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [
    { type: 'blight', factor: 50 },
    { type: 'force', factor: 100 },
  ],
  weaknesses: [
    { type: 'holy', factor: 100 },
    { type: 'shock', factor: 25 },
  ],
  immunities: [],
}

export const RestlessSpiritConfig: UnitBaseConfig = {
  abilities: [],
  actions: [
    {
      id: GhostFlameId,
      make: (u) => new GhostFlame(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: VampiricTouchId,
      make: (u) => new VampiricTouch(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [VampiricTouchId, ProtectId, GhostFlameId],
}
