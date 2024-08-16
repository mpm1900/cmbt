import { GameWorldNode, Id, Item, Team } from '.'

export type InitializeCombatProps = {
  enemyUnitCount: number
  onSuccess: () => void
  onFailure: () => void
}

export type EncounterContext = {
  team: Team | undefined
  encounter: Encounter
  activeNode: EncounterNode
  back: () => void
  log: (item: React.ReactNode, delay?: number) => void
  initializeCombat: (props: InitializeCombatProps) => void
  updateActiveWorldNode: (
    fn: (n: GameWorldNode) => Partial<GameWorldNode>
  ) => void
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => void
  updateTeam: (fn: (e: Team) => Partial<Team>) => void
  addItem: (item: Item) => void
}

export type Encounter = {
  id: Id
  nodes: EncounterNode[]
  activeNodeId: Id
}

export type EncounterNode = {
  id: Id
  title: React.ReactNode
  text: React.ReactNode
  choices: (ctx: EncounterContext) => EncounterChoice[]
  renderChoice?: (
    choice: EncounterChoice,
    index: number,
    ctx: EncounterContext
  ) => React.ReactNode
  renderChoices?: (ctx: EncounterContext) => React.ReactNode
}

export type EncounterChoice = {
  id: Id
  label: React.ReactNode
  resolve: (ctx: EncounterContext) => void
}

export type EncounterChoiceOption = {
  id: Id
  label: React.ReactNode
  resolve: (ctx: EncounterContext) => void
}
