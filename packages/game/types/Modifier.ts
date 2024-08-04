import { nanoid } from 'nanoid'
import { Id, Unit } from '.'
import { Mutation, MutationProps } from './Mutation'

export const ModifierId = () => `Modifier@${nanoid()}`

export type ModifierProps<T = {}> = MutationProps<T> & {
  maxInstances?: number
  duration?: number
  priority?: number
  persist?: boolean
}

export abstract class Modifier extends Mutation {
  maxInstances: number | undefined
  duration: number | undefined
  priority: number
  persist: boolean

  abstract resolve(unit: Unit): Partial<Unit>
  get key(): string {
    return `${this.rid}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: ModifierProps) {
    super(id, props)
    this.priority = props.priority ?? 0
    this.duration = props.duration
    this.maxInstances = props.maxInstances
    this.persist = props.persist || false
  }

  decrementDuration() {
    if (this.duration !== undefined) {
      this.duration -= 1
    }
    return this
  }
}
