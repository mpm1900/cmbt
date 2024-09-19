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
import { AncientGolem, AncientGolemConfig } from './Enemy/AncientGolem'
import { Revenant, RevenantConfig } from './Enemy/Revenant'
import { Wolf, WolfConfig } from './Enemy/Wolf'
import { Hellknight, TyranitarConfig } from './Hellknight'
import { Juggernaut, SnorlaxConfig } from './Juggernaut'
import { Paladin, PaladinConfig } from './Paladin'
import { Sorcerer, SorcererConfig } from './Sorcerer'
import { Witch, WitchConfig } from './Witch'
import { Wizard, WizardConfig } from './Wizard'

export * from './Blissy'
export * from './Cleric'
export * from './DemonSlayer'
export * from './DraconicScion'
export * from './Enemy'
export * from './Hellknight'
export * from './Juggernaut'
export * from './Paladin'
export * from './Sorcerer'
export * from './Witch'
export * from './Wizard'

export const PLAYER_BASES: UnitBase[] = [
  Cleric,
  Sorcerer,
  Wizard,
  Paladin,
  Hellknight,
  Juggernaut,
  DraconicScion,
  Witch,
  DemonSlayer,
]

export const ENEMY_BASES = [
  AncientGolem,
  Bear,
  DeathKnight,
  RestlessSpirit,
  Revenant,
  Snake,
  Wolf,
]

export const ALL_BASES: UnitBase[] = [...PLAYER_BASES, ...ENEMY_BASES]

export const BASE_CONFIGS: Record<Id, UnitBaseConfig> = {
  [AncientGolem.id]: AncientGolemConfig,
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
  [Paladin.id]: PaladinConfig,

  [Bear.id]: BearConfig,
  [RestlessSpirit.id]: RestlessSpiritConfig,
  [Revenant.id]: RevenantConfig,
  [Snake.id]: SnakeConfig,
  [Wolf.id]: WolfConfig,
}
