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
  HyperBeam,
  HyperBeamId,
  Protect,
  ProtectId,
  Sandstorm,
  SandstormId,
} from '../Actions'

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
      id: HyperBeamId,
      make: (unit) => new HyperBeam(unit.id, unit.teamId),
    },
    {
      id: ProtectId,
      make: (unit) => new Protect(unit.id, unit.teamId),
    },
    {
      id: SandstormId,
      make: (unit) => new Sandstorm(unit.id, unit.teamId),
    },
  ],
  defaultActionIds: [CrunchId, EarthquakeId, FireBlastId, SandstormId],
}
