import { Encounter, Id } from '.'

export type GameWorldNodeIconKey =
  | 'combat'
  | 'shop'
  | 'start'
  | 'locked'
  | 'unlocked'

export type GameWorldEdge = {
  id: Id
  target: Id
}

export type GameWorldNode = {
  id: Id
  size: number
  edges: GameWorldEdge[]
  icon: GameWorldNodeIconKey

  encounter: Encounter
  backtrackable: boolean
  completed: boolean
  repeatable: boolean
  locked: boolean
}

export type GameWorld = {
  nodes: GameWorldNode[]
  startingNodeId: Id
  activeNodeId: Id
}
