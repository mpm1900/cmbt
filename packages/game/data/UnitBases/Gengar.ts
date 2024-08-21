import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Disable, MagicMissile, PowerWordKill, WillOWisp } from '../Actions'
import { SizeUp } from '../Augments'
import {
  DisableId,
  MagicMissileId,
  PowerWordKillId,
  SizeUpId,
  WillOWispId,
} from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Gengar: UnitBase = {
  id: nanoid(),
  name: 'Gengar',
  stats: {
    ...ZERO_UNIT.stats,
    health: 60,
    physical: 55,
    defense: 55,
    magic: 135,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const GengarConfig: UnitBaseConfig = {
  abilities: [SizeUp],
  actionsCount: 4,
  actions: [
    {
      id: DisableId,
      make: (u) => new Disable(u.id, u.teamId),
    },
    {
      id: MagicMissileId,
      make: (u) => new MagicMissile(u.id, u.teamId),
    },
    {
      id: PowerWordKillId,
      make: (u) => new PowerWordKill(u.id, u.teamId),
    },
    {
      id: WillOWispId,
      make: (u) => new WillOWisp(u.id, u.teamId),
    },
  ],
  defaultAbilityId: SizeUpId,
  defaultActionIds: [DisableId, MagicMissileId, PowerWordKillId, WillOWispId],
}
