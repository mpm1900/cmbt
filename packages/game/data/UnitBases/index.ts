import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import { Cleric, ClericConfig } from './Cleric'
import { DemonSlayer, TempestKnightConfig } from './DemonSlayer'
import { DraconicDiscipleConfig, DraconicScion } from './DraconicScion'
import {
  Celebi,
  CelebiConfig,
  RestlessSpirit,
  RestlessSpiritConfig,
} from './Enemy'
import { Wolf, WolfConfig } from './Enemy/Wolf'
import { Snorlax, SnorlaxConfig } from './Snorlax'
import { Sorcerer, SorcererConfig } from './Sorcerer'
import { Steelix, SteelixConfig } from './Steelix'
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
  DemonSlayer,
  Sorcerer,
  Cleric,

  // Celebi,
  // RestlessSpirit,
]

export const ENEMY_BASES = [Celebi, RestlessSpirit, Wolf]

export const ALL_BASES: UnitBase[] = [...PLAYER_BASES, ...ENEMY_BASES]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [Blissy.id]: BlissyConfig,
  [Cleric.id]: ClericConfig,
  [Celebi.id]: CelebiConfig,
  [DemonSlayer.id]: TempestKnightConfig,
  [Wizard.id]: WizardConfig,
  [DraconicScion.id]: DraconicDiscipleConfig,
  [Snorlax.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Tyranitar.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,
  [Sorcerer.id]: SorcererConfig,

  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Wolf.id]: WolfConfig,
}
