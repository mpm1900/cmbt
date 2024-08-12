import { Id, Item } from '.'

export type TeamResources = {
  credits: number
}

export type Team = {
  id: Id
  items: Item[]
  resources: TeamResources
}
