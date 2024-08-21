import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Protect, TrickRoom } from '../Actions'
import { ProtectId, TrickRoomId } from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Witch: UnitBase = {
  id: nanoid(),
  name: 'Witch',
  stats: {
    ...ZERO_UNIT.stats,
    health: 120,
    physical: 50,
    defense: 70,
    magic: 100,
    speed: 30,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const WitchConfig: UnitBaseConfig = {
  abilities: [],
  actionsCount: 5,
  actions: [
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: TrickRoomId,
      make: (u) => new TrickRoom(u.id, u.teamId),
    },
  ],
  defaultAbilityId: undefined,
  defaultActionIds: [ProtectId, TrickRoomId],
}
