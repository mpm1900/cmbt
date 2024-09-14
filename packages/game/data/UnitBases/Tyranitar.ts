import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  BattleStance,
  DragonStance,
  Earthquake,
  Fireball,
  Firestorm,
  FurySwipes,
  InfernalBlast,
  PiercingStrike,
  PowerStance,
  Protect,
  Slash,
} from '../Actions'
import { Spikes } from '../Actions/Spikes'
import { Inferno } from '../Augments'
import {
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  FireballId,
  FirestormId,
  FurySwipesId,
  InfernalBlastId,
  InfernoId,
  PiercingStrikeId,
  PowerStanceId,
  ProtectId,
  SlashId,
  SpikesId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Hellknight: UnitBase = {
  id: nanoid(),
  name: 'Hellknight',
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
  tags: [],
  augmentSlots: 3,
  affinities: [
    { type: 'fire', factor: 25 },
    { type: 'force', factor: 25 },
  ],
  resistances: [
    { type: 'fire', factor: 25 },
    { type: 'force', factor: 10 },
  ],
  weaknesses: [
    { type: 'arcane', factor: 25 },
    { type: 'psychic', factor: 25 },
    { type: 'holy', factor: 25 },
  ],
}

export const TyranitarConfig: UnitBaseConfig = {
  abilities: [Inferno],
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
      id: ElixirOfPowerId,
      make: (unit) => new BattleStance(unit.id, unit.teamId),
    },
    {
      id: FireballId,
      make: (unit) => new Fireball(unit.id, unit.teamId),
    },
    {
      id: InfernalBlastId,
      make: (unit) => new InfernalBlast(unit.id, unit.teamId),
    },
    {
      id: FurySwipesId,
      make: (unit) => new FurySwipes(unit.id, unit.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (unit) => new PiercingStrike(unit.id, unit.teamId),
    },
    {
      id: PowerStanceId,
      level: 50,
      make: (unit) => new PowerStance(unit.id, unit.teamId),
    },
    {
      id: ProtectId,
      make: (unit) => new Protect(unit.id, unit.teamId),
    },
    {
      id: FirestormId,
      make: (unit) => new Firestorm(unit.id, unit.teamId),
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
  defaultAbilityId: InfernoId,
  defaultActionIds: [
    PiercingStrikeId,
    EarthquakeId,
    InfernalBlastId,
    ProtectId,
  ],
}
