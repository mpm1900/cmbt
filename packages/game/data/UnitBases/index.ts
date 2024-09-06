import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import {
  Celebi,
  CelebiConfig,
  RestlessSpirit,
  RestlessSpiritConfig,
} from './Enemy'
import { Wolf, WolfConfig } from './Enemy/Wolf'
import { Gengar, GengarConfig } from './Gengar'
import { Salamence, SalamenceConfig } from './Salamence'
import { Snorlax, SnorlaxConfig } from './Snorlax'
import { Steelix, SteelixConfig } from './Steelix'
import { TempestKnight, TempestKnightConfig } from './TempestKnight'
import { Tyranitar, TyranitarConfig } from './Tyranitar'
import { Witch, WitchConfig } from './Witch'

export * from './Enemy'

export const PLAYER_BASES: UnitBase[] = [
  // Wolf,
  Tyranitar,
  TempestKnight,
  Snorlax,
  Salamence,
  Blissy,
  Witch,
  Gengar,
]

export const ENEMY_BASES = [Celebi, RestlessSpirit, Wolf]

export const ALL_BASES: UnitBase[] = [...PLAYER_BASES, ...ENEMY_BASES]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [Blissy.id]: BlissyConfig,
  [Celebi.id]: CelebiConfig,
  [TempestKnight.id]: TempestKnightConfig,
  [Gengar.id]: GengarConfig,
  [Salamence.id]: SalamenceConfig,
  [Snorlax.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Tyranitar.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,

  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Wolf.id]: WolfConfig,
}
