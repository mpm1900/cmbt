import { Id } from '.'
import { Mutation, MutationProps } from './Mutation'
import { Unit } from './Unit'

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

  abstract resolve(unit: Unit): Partial<Unit>
  get key(): string {
    return `${this.rid}.${this.parentId ?? this.sourceId}`
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

  getProps(): ModifierProps {
    return {
      duration: this.duration,
      maxInstances: this.maxInstances,
      priority: this.priority,
      persistOnSwitch: this.persistOnSwitch,
      persistOnCombatEnd: this.persistOnCombatEnd,
    }
  }

  clone(props: Partial<ModifierProps>) {
    const { constructor } = Object.getPrototypeOf(this)
    return new constructor(this.id, {
      ...this.getProps(),
      ...props,
    }) as typeof this
  }

  decrementDuration() {
    if (this.duration !== undefined) {
      this.duration -= 1
    }
    return this
  }
}
