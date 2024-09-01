import { Id } from '.'

export type Npc = {
  id: Id
  name: string

  values: {
    [key: string]: number
  }
}
