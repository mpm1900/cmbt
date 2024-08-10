import { Id } from '.'

export type EncounterContext = {
  encounter: Encounter
  activeNode: EncounterNode
  back: () => void
  initializeCombat: () => void
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => void
}

export type Encounter = {
  id: Id
  nodes: EncounterNode[]
  activeNodeId: Id
}

export type EncounterNode = {
  id: Id
  title: React.ReactNode
  description: React.ReactNode
  choices: EncounterChoice[]
}

export type EncounterChoice = {
  id: Id
  label: React.ReactNode
  resolve?: (ctx: EncounterContext) => void
  options: EncounterChoiceOption[]
}

export type EncounterChoiceOption = {
  id: Id
  label: React.ReactNode
  resolve: (ctx: EncounterContext) => void
}
