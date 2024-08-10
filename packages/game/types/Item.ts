import { Action, Unit } from '.'

export type Item = {
  count: number
  action: (unit: Unit) => Action
}
