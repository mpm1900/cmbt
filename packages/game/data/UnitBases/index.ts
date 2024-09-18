import { Id, UnitBase, UnitBaseConfig } from '../../types'
import { Blissy, BlissyConfig } from './Blissy'
import { Cleric, ClericConfig } from './Cleric'
import { DemonSlayer, TempestKnightConfig } from './DemonSlayer'
import { DraconicDiscipleConfig, DraconicScion } from './DraconicScion'
import {
  Bear,
  BearConfig,
  DeathKnight,
  DeathKnightConfig,
  RestlessSpirit,
  RestlessSpiritConfig,
  Snake,
  SnakeConfig,
} from './Enemy'
import { Revenant, RevenantConfig } from './Enemy/Revenant'
import { Wolf, WolfConfig } from './Enemy/Wolf'
import { Hellknight, TyranitarConfig } from './Hellknight'
import { Juggernaut, SnorlaxConfig } from './Juggernaut'
import { Sorcerer, SorcererConfig } from './Sorcerer'
import { Witch, WitchConfig } from './Witch'
import { Wizard, WizardConfig } from './Wizard'

export * from './Enemy'
export * from './Wizard'

export const PLAYER_BASES: UnitBase[] = [
  // Wolf,

  Cleric,
  DraconicScion,
  Hellknight,
  Wizard,
  Juggernaut,
  Sorcerer,
  Witch,

  DemonSlayer,

  // Celebi,
  // RestlessSpirit,
]

export const ENEMY_BASES = [
  Bear,
  DeathKnight,
  RestlessSpirit,
  Revenant,
  Snake,
  Wolf,
]

export const ALL_BASES: UnitBase[] = [...PLAYER_BASES, ...ENEMY_BASES]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [Blissy.id]: BlissyConfig,
  [Cleric.id]: ClericConfig,
  [DeathKnight.id]: DeathKnightConfig,
  [DemonSlayer.id]: TempestKnightConfig,
  [Wizard.id]: WizardConfig,
  [DraconicScion.id]: DraconicDiscipleConfig,
  [Juggernaut.id]: SnorlaxConfig,
  [Hellknight.id]: TyranitarConfig,
  [Witch.id]: WitchConfig,
  [Sorcerer.id]: SorcererConfig,

  [Bear.id]: BearConfig,
  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Revenant.id]: RevenantConfig,
  [Snake.id]: SnakeConfig,
  [Wolf.id]: WolfConfig,
}
