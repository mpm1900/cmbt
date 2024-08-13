import { Id, Modifier, Mutation, Unit } from '.'

export type Augment = {
  id: Id
  name: string

  mutations(unit: Unit): Mutation[]
  modifiers(unit: Unit): Modifier[]
}
