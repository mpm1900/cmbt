import {
  Id,
  Item,
  Modifier,
  Mutation,
  Npc,
  Team,
  TeamResources,
  Unit,
  WorldNode,
} from '.'

export type CombatReward = {
  items: Item[]
  resources: TeamResources
  xp: number
}

export type InitializeCombatOptions = {
  userTeam?: Team
  userUnits?: Unit[]
  enemyTeam: Team
  enemyUnits: Unit[]
  reward: CombatReward
  modifiers?: Modifier[]
  mutations?: Mutation[]
  onSuccess: () => void
  onFailure: () => void
}

export type EncounterContext = {
  team: Team | undefined
  units: Unit[]
  encounter: Encounter
  activeNode: EncounterNode
  npcs: Npc[]
  back: () => void
  log: (item: React.ReactNode, delay?: number) => void
  initializeCombat: (props: InitializeCombatOptions) => void
  updateActiveWorldNode: (fn: (n: WorldNode) => Partial<WorldNode>) => void
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => Encounter
  updateUnit: (id: Id, fn: (e: Unit) => Partial<Unit>) => void
  updateTeam: (fn: (e: Team) => Partial<Team>) => void
  buyItem: (item: Item, cost: number) => void
  addNpc: (npc: Npc) => void
  updateNpcValue: (
    id: Id,
    key: string,
    fn: (v: number | undefined) => number
  ) => void
}

export type Encounter = {
  id: Id
  nodes: EncounterNode[]
  activeNodeId: Id
  setup: (ctx: EncounterContext) => void
  values: {
    [key: string]: number
  }
}

export type EncounterNodeProps = {
  ctx: EncounterContext
}

export type EncounterChoiceProps = {
  choice: EncounterChoice
  index: number
  ctx: EncounterContext
}

export type EncounterComponent = (props: EncounterNodeProps) => React.ReactNode
export type EncounterChoiceComponent = (
  props: EncounterChoiceProps
) => React.ReactNode

export type EncounterNode = {
  id: Id
  icon: React.ReactNode
  title: React.ReactNode
  text: React.ReactNode
  tabs?: (ctx: EncounterContext) => EncounterChoice[]
  choices?: (ctx: EncounterContext) => EncounterChoice[]
  Choice?: EncounterChoiceComponent
  Component?: EncounterComponent
}

export type EncounterChoice = {
  id: Id
  label: React.ReactNode
  resolve: (ctx: EncounterContext) => void
}
