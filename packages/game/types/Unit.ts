import { ActionMaker, Augment, Id } from '.'
import { Action } from './Action'
import { DamageType } from './Damage'
import { Modifier } from './Modifier'

export type AttackType =
  | 'physical'
  | 'magic'
  | 'physical-reverse'
  | 'magic-reverse'
export type UnitAttackType = 'physical' | 'magic'

export const ATTACK_TYPES: AttackType[] = ['magic', 'physical']

export type StatKey =
  | 'attack'
  | 'accuracy'
  | 'criticalChance'
  | 'criticalDamage'
  | 'defense'
  | 'devotion'
  | 'evasion'
  | 'focus'
  | 'health'
  | 'magic'
  | 'memory'
  | 'nonDamagePriority'
  | 'priority'
  | 'speed'
  | 'stamina'
  | 'xpMultiplier'
  | `${UnitAttackType}Expansion`
  | `${UnitAttackType}Negation`
  | `${UnitAttackType}Priority`
  | `${DamageType}Expansion`
  | `${DamageType}Negation`
  | `${DamageType}Priority`

export type Stats = Record<StatKey, number>
export type ValueKey =
  | 'damage'
  | 'devotion'
  | 'focus'
  | 'stamina'
  | `${UnitAttackType}Armor`
export type Values = Record<ValueKey, number>

export type FlagKey =
  | 'isActive'
  | 'isBaned'
  | 'isBlessed'
  | 'isChoiceLocked'
  | 'isDamageLocked'
  | 'isHidden'
  | 'isInspected'
  | 'isLocked'
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
  inactiveTurns: number
}

export type UnitTag = {
  id: Id
  label: string
}

export type UnitBaseAffinity = {
  type: DamageType
  factor: number
}

export type UnitBase = {
  id: Id
  name: string
  stats: Stats
  tags: UnitTag[]
  augmentSlots: number
  affinities: UnitBaseAffinity[]
  resistances: UnitBaseAffinity[]
  weaknesses: UnitBaseAffinity[]
  immunities: Modifier[]
}

export type UnitBaseConfig = {
  abilities: Augment[]
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
  stages: Partial<Stats>
  values: Values
  flags: Flags
  registry: UnitRegistry
  abilities: Augment[]
  augments: Augment[]
  modifiers(): Modifier[]
  actions: Action[]
  metadata: UnitMetadata
  tags: UnitTag[]
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
