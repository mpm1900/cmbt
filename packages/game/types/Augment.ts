import { Id, Modifier, Mutation, Unit } from '.'

export abstract class Augment {
  readonly id: Id
  readonly name: string

  constructor(id: Id, name: string) {
    this.id = id
    this.name = name
  }

  abstract mutations(unit: Unit): Mutation[]
  abstract modifiers(unit: Unit): Modifier[]
}
