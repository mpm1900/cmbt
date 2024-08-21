import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Earthquake,
  Fireball,
  FireBlast,
  PiercingStrike,
  Protect,
  Sandstorm,
} from '../Actions'
import { Spikes } from '../Actions/Spikes'
import { SandStream } from '../Augments'
import {
  EarthquakeId,
  FireballId,
  FireBlastId,
  PiercingStrikeId,
  ProtectId,
  SandstormId,
  SandStreamId,
  SpikesId,
} from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Tyranitar: UnitBase = {
  id: nanoid(),
  name: 'Flamestorm Knight',
  stats: {
    ...ZERO_UNIT.stats,
    health: 100,
    physical: 134,
    defense: 110,
    magic: 90,
    speed: 61,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const TyranitarConfig: UnitBaseConfig = {
  abilities: [SandStream],
  actionsCount: 4,
  actions: [
    {
      id: EarthquakeId,
      make: (unit) => new Earthquake(unit.id, unit.teamId),
    },
    {
      id: FireballId,
      make: (unit) => new Fireball(unit.id, unit.teamId),
    },
    {
      id: FireBlastId,
      make: (unit) => new FireBlast(unit.id, unit.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (unit) => new PiercingStrike(unit.id, unit.teamId),
    },
    {
      id: ProtectId,
      make: (unit) => new Protect(unit.id, unit.teamId),
    },
    {
      id: SandstormId,
      make: (unit) => new Sandstorm(unit.id, unit.teamId),
    },
    {
      id: SpikesId,
      make: (unit) => new Spikes(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: SandStreamId,
  defaultActionIds: [PiercingStrikeId, EarthquakeId, FireBlastId, ProtectId],
}
