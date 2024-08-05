import { Action } from './Action'
import { DamageType } from './Damage'
import { Modifier } from './Modifier'
import { Id } from '.'

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
export type ValueKey = 'damage' | 'focus' | 'stamina' | 'devotion'
export type Values = Record<ValueKey, number>

export type FlagKey = 'isRecharging' | 'isActive'
export type Flags = Record<FlagKey, boolean>

export type RegistryKey = 'modifiers' | 'actions'
export type Registry = Record<RegistryKey, string[]>

export type UnitMetadata = {
  lastUsedActionId: string | undefined
  modified: boolean
  hasBeenSeen: boolean
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
