import { ActionMaker, Augment, Id } from '.'
import { Action } from './Action'
import { DamageType } from './Damage'
import { Modifier } from './Modifier'

export type AttackType = 'physical' | 'magic'

export const ATTACK_TYPES: AttackType[] = ['magic', 'physical']

export type StatKey =
  | 'accuracy'
  | 'criticalChance'
  | 'criticalDamage'
  | 'defense'
  | 'devotion'
  | 'evasion'
  | 'focus'
  | 'health'
  | 'speed'
  | 'stamina'
  | 'attack'
  | 'magic'
  | 'xpMultiplier'
  | 'priority'
  | 'nonDamagePriority'
  | `${AttackType}Expansion`
  | `${AttackType}Negation`
  | `${AttackType}Priority`
  | `${DamageType}Expansion`
  | `${DamageType}Negation`
  | `${DamageType}Priority`

export type Stats = Record<StatKey, number>
export type ValueKey =
  | 'damage'
  | 'devotion'
  | 'focus'
  | 'stamina'
  | `${AttackType}Armor`
export type Values = Record<ValueKey, number>

export type FlagKey =
  | 'isActive'
  | 'isHexed'
  | 'isHidden'
  | 'isInspected'
  | 'isProtected'
  | 'isStunned'
export type Flags = Record<FlagKey, boolean>

export type UnitRegistryKey = 'modifiers' | 'actions'
export type UnitRegistry = Record<UnitRegistryKey, string[]>

export type UnitMetadata = {
  lastUsedActionId: string | undefined
  modified: boolean
  hasBeenSeen: boolean
  activeTurns: number
}

export type UnitBaseAffinity = {
  type: DamageType
  factor: number
}

export type UnitBase = {
  id: Id
  name: string
  stats: Stats
  augmentSlots: number
  affinities: UnitBaseAffinity[]
  resistances: UnitBaseAffinity[]
  weaknesses: UnitBaseAffinity[]
}

export type UnitBaseConfig = {
  abilities: Augment[]
  actionsCount: number
  actions: ActionMaker[]
  defaultAbilityId: Id | undefined
  defaultActionIds: Id[]
}

export type Unit = {
  readonly id: Id
  readonly teamId: Id
  baseId: Id
  name: string
  level: number
  xp: number
  stats: Stats
  values: Values
  flags: Flags
  registry: UnitRegistry
  augments: Augment[]
  modifiers(): Modifier[]
  actions: Action[]
  metadata: UnitMetadata
}

export type UnitBuilder = {
  readonly id: Id
  level: number
  name: string
  base: UnitBase
  config: UnitBaseConfig
  ability: Augment | undefined
  actions: ActionMaker[]
}
