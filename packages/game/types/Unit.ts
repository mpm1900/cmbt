import { ActionMaker, Augment, Id } from '.'
import { Action } from './Action'
import { DamageType } from './Damage'
import { Modifier } from './Modifier'

export type AttackTypes = 'physical' | 'magic'

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
  | AttackTypes
  | `${DamageType}Negation`
  | `${DamageType}Expansion`

export type Stats = Record<StatKey, number>
export type ValueKey =
  | 'damage'
  | 'devotion'
  | 'focus'
  | 'stamina'
  | `${AttackTypes}Armor`
export type Values = Record<ValueKey, number>

export type FlagKey = 'isActive' | 'isInspected' | 'isProtected' | 'isStunned'
export type Flags = Record<FlagKey, boolean>

export type RegistryKey = 'modifiers' | 'actions'
export type Registry = Record<RegistryKey, string[]>

export type UnitMetadata = {
  lastUsedActionId: string | undefined
  modified: boolean
  hasBeenSeen: boolean
  activeTurns: number
}

export type UnitBase = {
  id: Id
  name: string
  stats: Stats
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
  stats: Stats
  values: Values
  flags: Flags
  registry: Registry
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
