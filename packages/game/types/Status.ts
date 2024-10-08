import { Id, Modifier, Mutation, Unit } from '.'

export type Status = {
  id: Id
  duration?: number
  mutations: (source: Unit, parent: Unit) => Mutation[]
  modifiers: (source: Unit, parent: Unit) => Modifier[]
  persistOnCombatEnd?: boolean
  persistOnSwitch?: boolean
}
