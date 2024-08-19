import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import { Celebi, CelebiConfig } from './Celebi'
import { DeoxysP, DeoxysPConfig } from './DeoxysP'
import { DeoxysS, DeoxysSConfig } from './DeoxysS'
import { Gengar, GengarConfig } from './Gengar'
import { Salamence, SalamenceConfig } from './Salamence'
import { Snorlax, SnorlaxConfig } from './Snorlax'
import { Steelix, SteelixConfig } from './Steelix'
import { Tyranitar, TyranitarConfig } from './Tyranitar'

export const ALL_BASES: UnitBase[] = [
  Tyranitar,
  Blissy,
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
  [DeoxysP.id]: DeoxysPConfig,
  [DeoxysS.id]: DeoxysSConfig,
  [Gengar.id]: GengarConfig,
  [Salamence.id]: SalamenceConfig,
  [Snorlax.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Tyranitar.id]: TyranitarConfig,
}
