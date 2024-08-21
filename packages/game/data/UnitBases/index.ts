import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import { Celebi, CelebiConfig } from './Celebi'
import { DeoxysS, DeoxysSConfig } from './DeoxysS'
import { Gengar, GengarConfig } from './Gengar'
import { Salamence, SalamenceConfig } from './Salamence'
import { Snorlax, SnorlaxConfig } from './Snorlax'
import { Steelix, SteelixConfig } from './Steelix'
import { TempestKnight, TempestKnightConfig } from './TempestKnight'
import { Tyranitar, TyranitarConfig } from './Tyranitar'
import { Witch, WitchConfig } from './Witch'

export const PLAYER_BASES: UnitBase[] = [
  Tyranitar,
  TempestKnight,
  Snorlax,
  Salamence,
  Blissy,
  Witch,
  //DeoxysP,
  //DeoxysM,
  //DeoxysS,

  Gengar,

  // Steelix,,
  //Celebi,
]

export const ALL_BASES: UnitBase[] = [
  Tyranitar,
  TempestKnight,
  Blissy,
  Witch,
  //DeoxysP,
  //DeoxysM,
  //DeoxysS,
  Gengar,
  Salamence,
  Snorlax,
  // Steelix,,
  Celebi,
]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [Blissy.id]: BlissyConfig,
  [Celebi.id]: CelebiConfig,
  [TempestKnight.id]: TempestKnightConfig,
  [DeoxysS.id]: DeoxysSConfig,
  [Gengar.id]: GengarConfig,
  [Salamence.id]: SalamenceConfig,
  [Snorlax.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Tyranitar.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,
}
