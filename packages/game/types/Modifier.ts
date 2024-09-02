import { Id } from '.'
import { Mutation, MutationProps } from './Mutation'

export type ModifierProps<T = {}> = MutationProps<T> & {
  duration?: number
  maxInstances?: number
  priority?: number
  persistOnSwitch?: boolean
  persistOnCombatEnd?: boolean
  statusId?: Id
}

export abstract class Modifier extends Mutation {
  maxInstances: number | undefined
  duration: number | undefined
  priority: number
  persistOnSwitch: boolean
  persistOnCombatEnd: boolean
  statusId: Id | undefined

  get key(): string {
    return `${this.registryId}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: ModifierProps) {
    super(id, props)
    this.priority = props.priority ?? 0
    this.duration = props.duration
    this.maxInstances = props.maxInstances
    this.persistOnSwitch = props.persistOnSwitch || false
    this.persistOnCombatEnd = props.persistOnCombatEnd || false
    this.statusId = props.statusId
  }

  decrementDuration() {
    if (this.duration !== undefined) {
      this.duration -= 1
    }
    return this
  }
}
