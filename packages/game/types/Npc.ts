import { Id } from '.'

export type Npc = {
  id: Id
  name: string
  attr: {
    alive: boolean
  }

  values: {
    [key: string]: number
  }
}
