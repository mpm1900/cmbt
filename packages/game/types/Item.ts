import { Action, Id, Unit } from '.'

export type Item = {
  id: Id
  count: number
  action: (unit: Unit) => Action
}
