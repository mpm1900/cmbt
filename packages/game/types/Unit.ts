import { Action } from './Action'
import { DamageType } from './Damage'
import { Modifier } from './Modifier'
import { ActionMaker, Id } from '.'

export type AttackTypes = 'physical' | 'magic'

export type StatKey =
  | 'speed'
  | 'health'
  | 'focus'
  | 'stamina'
  | 'devotion'
  | 'accuracy'
  | 'defense'
  | AttackTypes
  | `${DamageType}Negation`
  | `${DamageType}Expansion`

export type Stats = Record<StatKey, number>
export type ValueKey =
  | 'damage'
  | 'focus'
  | 'stamina'
  | 'devotion'
  | `${AttackTypes}Armor`
export type Values = Record<ValueKey, number>

export type FlagKey = 'isRecharging' | 'isActive' | 'isProtected'
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
  actionsCount: number
  actions: ActionMaker[]
  defaultActionIds: Id[]
}

export type Unit = {
  readonly id: Id
  readonly teamId: Id
  name: string
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
  name: string
  base: UnitBase
  config: UnitBaseConfig
  actions: ActionMaker[]
}
