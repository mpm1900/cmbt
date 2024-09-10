import { Id, Item, TeamResources } from '.'

type NpcValues = { [key: string]: number }

export type Npc<V extends NpcValues = {}> = {
  id: Id
  name: string
  attr: {
    alive: boolean
  }
  items: Item[]
  resources: TeamResources
  values: V & NpcValues
}
