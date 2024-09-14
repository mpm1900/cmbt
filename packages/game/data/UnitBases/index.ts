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
import { Steelix, SteelixConfig } from './Hellknight'
import { Juggernaut, SnorlaxConfig } from './Juggernaut'
import { Sorcerer, SorcererConfig } from './Sorcerer'
import { Hellknight, TyranitarConfig } from './Tyranitar'
import { Witch, WitchConfig } from './Witch'
import { Wizard, WizardConfig } from './Wizard'

export * from './Enemy'

export const PLAYER_BASES: UnitBase[] = [
  // Wolf,

  Cleric,
  DraconicScion,
  Hellknight,
  Juggernaut,
  Sorcerer,
  Witch,
  Wizard,

  DemonSlayer,

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
  [Juggernaut.id]: SnorlaxConfig,
  [Steelix.id]: SteelixConfig,
  [Hellknight.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,
  [Sorcerer.id]: SorcererConfig,

  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Wolf.id]: WolfConfig,
}
