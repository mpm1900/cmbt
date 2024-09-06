import { Encounter, Id } from '.'

export type WorldNodeIconKey =
  | '?'
  | 'combat'
  | 'shop'
  | 'start'
  | 'locked'
  | 'unlocked'
  | 'spring'
  | 'altar'

export type WorldEdge = {
  id: Id
  target: Id
}

export type WorldNode = {
  id: Id
  size: number
  edges: WorldEdge[]

  encounter: Encounter

  icon: WorldNodeIconKey
  seenIcon?: WorldNodeIconKey
  visitedIcon?: WorldNodeIconKey
  completedIcon: WorldNodeIconKey

  seen: boolean
  visited: boolean
  completed: boolean
  retreatable: boolean
  repeatable: boolean
  locked: boolean
}

export type World = {
  nodes: WorldNode[]
  startingNodeId: Id
  activeNodeId: Id
}
