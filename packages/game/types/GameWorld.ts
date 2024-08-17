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

  encounter: Encounter
  icon: GameWorldNodeIconKey

  completed: boolean
  retreatable: boolean
  repeatable: boolean
  locked: boolean
}

export type GameWorld = {
  nodes: GameWorldNode[]
  startingNodeId: Id
  activeNodeId: Id
}
