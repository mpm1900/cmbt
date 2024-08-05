import { Action } from '.'
import { Modifier } from '.'
import { Team } from './Team'
import { Unit } from './Unit'

export type Id = string
export type Entity = { id: Id }

export type ActionsQueueItem = {
  id: string
  action: Action
  targetIds: string[]
}

export type CombatContext = {
  units: Unit[]
  modifiers: Modifier[]
  teams: Team[]
  user: Id
  log: (node: React.ReactNode) => void
  // queue: ActionsQueueItem[]
}

export * from './Action'
export * from './Damage'
export * from './Item'
export * from './Modifier'
export * from './Mutation'
export * from './Query'
export * from './Team'
export * from './Trigger'
export * from './Unit'
