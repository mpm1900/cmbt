import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import { DraconicDiscipleConfig, DraconicScion } from './DraconicScion'
import {
  Celebi,
  CelebiConfig,
  RestlessSpirit,
  RestlessSpiritConfig,
} from './Enemy'
import { Wolf, WolfConfig } from './Enemy/Wolf'
import { Snorlax, SnorlaxConfig } from './Snorlax'
import { Steelix, SteelixConfig } from './Steelix'
import { Stormwalker, TempestKnightConfig } from './Stormwalker'
import { Tyranitar, TyranitarConfig } from './Tyranitar'
import { Witch, WitchConfig } from './Witch'
import { Wizard, WizardConfig } from './Wizard'

export * from './Enemy'

export const PLAYER_BASES: UnitBase[] = [
  // Wolf,
  Snorlax,
  Witch,
  Wizard,
  DraconicScion,
  Tyranitar,
  Stormwalker,

  // Celebi,
  // RestlessSpirit,
]

export const ENEMY_BASES = [Celebi, RestlessSpirit, Wolf]

export const ALL_BASES: UnitBase[] = [...PLAYER_BASES, ...ENEMY_BASES]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [Blissy.id]: BlissyConfig,
  [Celebi.id]: CelebiConfig,
  [Stormwalker.id]: TempestKnightConfig,
  [Wizard.id]: WizardConfig,
  [DraconicScion.id]: DraconicDiscipleConfig,
  [Snorlax.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Tyranitar.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,

  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Wolf.id]: WolfConfig,
}
