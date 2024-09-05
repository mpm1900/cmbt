import { Id, Modifier, Mutation, Unit } from '.'

export type Augment = {
  id: Id
  name: string
  itemRtid?: Id
  cost?: number
  unitBaseIds?: Id[]

  mutations(unit: Unit): Mutation[]
  modifiers(unit: Unit): Modifier[]
}
