import { Action, Id, Unit } from '.'

export type Item = {
  id: Id
  name: string
  count: number
  cost: number
  action?: (unit: Unit) => Action
}
