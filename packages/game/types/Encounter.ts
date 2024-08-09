import { Id } from '.'

export type EncounterContext = {
  encounter: Encounter
  activeNode: EncounterNode
  initializeCombat: () => void
}

export type Encounter = {
  id: Id
  nodes: EncounterNode[]
  activeNodeId: Id
}

export type EncounterNode = {
  id: Id
  description: string
  choices: EncounterChoice[]
}

export type EncounterChoice = {
  id: Id
  label: string
  resolve?: (ctx: EncounterContext) => void
  options: EncounterChoiceOption[]
}

export type EncounterChoiceOption = {
  id: Id
  label: string
  resolve: (ctx: EncounterContext) => void
}
