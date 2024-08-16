import { Encounter, EncounterContext, Id } from '.'

export type GameWorldNodeIconKey = 'combat' | 'shop' | 'start'

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
  completed: boolean
  repeatable: boolean
  onEnter?: (ctx: EncounterContext) => void
}

export type GameWorld = {
  nodes: GameWorldNode[]
  startingNodeId: Id
  activeNodeId: Id
}
