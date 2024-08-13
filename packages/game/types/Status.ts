import { Id, Modifier, Mutation, Unit } from '.'

export type Status = {
  id: Id
  mutations: (source: Unit, parent: Unit) => Mutation[]
  modifiers: (source: Unit, parent: Unit) => Modifier[]
}
