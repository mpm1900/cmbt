import { Action, Augment, Id, Unit } from '.'

export type Item = {
  id: Id
  rtid: Id
  name: string
  cost: number
  action?: (unit: Unit) => Action
  augment?: Augment
  key?: Id
}

export type GroupedItem = Item & {
  count: number
}
