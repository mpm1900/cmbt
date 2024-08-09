import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { ZERO_UNIT } from '../Units'
import {
  Crunch,
  CrunchId,
  Earthquake,
  EarthquakeId,
  Fireball,
  FireballId,
  FireBlast,
  FireBlastId,
  Protect,
  ProtectId,
  Sandstorm,
  SandstormId,
} from '../Actions'
import { Intimidate, SandStream, SandStreamId } from '../Augments'
import { Spikes, SpikesId } from '../Actions/Spikes'

export const Tyranitar: UnitBase = {
  id: nanoid(),
  name: 'Tyranitar',
  stats: {
    ...ZERO_UNIT.stats,
    health: 310,
    physical: 134,
    defense: 110,
    magic: 95,
    speed: 61,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const TyranitarConfig: UnitBaseConfig = {
  abilities: [new SandStream()],
  actionsCount: 4,
  actions: [
    {
      id: CrunchId,
      make: (unit) => new Crunch(unit.id, unit.teamId),
    },
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
  defaultActionIds: [CrunchId, EarthquakeId, FireBlastId, ProtectId],
}
