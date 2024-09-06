import { Id } from '.'

type NpcValues = { [key: string]: number }

export type Npc<V extends NpcValues = {}> = {
  id: Id
  name: string
  attr: {
    alive: boolean
  }

  values: V & NpcValues
}
