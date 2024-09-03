import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  DragonStance,
  Earthquake,
  Fireball,
  FireBlast,
  PiercingStrike,
  Protect,
  Sandstorm,
  Slash,
} from '../Actions'
import { Spikes } from '../Actions/Spikes'
import { SandStream } from '../Augments'
import {
  DragonStanceId,
  EarthquakeId,
  FireballId,
  FireBlastId,
  PiercingStrikeId,
  ProtectId,
  SandstormId,
  SandStreamId,
  SlashId,
  SpikesId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Tyranitar: UnitBase = {
  id: nanoid(),
  name: 'Flamestorm Knight',
  stats: {
    ...BASE_UNIT.stats,
    health: 100,
    attack: 134,
    defense: 110,
    magic: 90,
    speed: 61,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [{ type: 'fire', factor: 25 }],
  resistances: [{ type: 'fire', factor: 30 }],
  weaknesses: [{ type: 'arcane', factor: 25 }],
}

export const TyranitarConfig: UnitBaseConfig = {
  abilities: [SandStream],
  actionsCount: 4,
  actions: [
    {
      id: DragonStanceId,
      make: (unit) => new DragonStance(unit.id, unit.teamId),
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
      id: SlashId,
      make: (unit) => new Slash(unit.id, unit.teamId),
    },
    {
      id: SpikesId,
      make: (unit) => new Spikes(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: SandStreamId,
  defaultActionIds: [PiercingStrikeId, EarthquakeId, FireBlastId, ProtectId],
}
