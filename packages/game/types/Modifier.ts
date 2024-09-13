import { Id } from '.'
import { Mutation, MutationProps } from './Mutation'

export const MODIFIER_PRIORITIES = {
  IMMUNITIES: -2,
  PRE: -1,
  DEFAULT: 0,
  STAGES: 1,
  APPLY_STAGES: 2,
  POST: 3,
  WIPE: 4,
  SET: 5,
}

export type ModifierProps<T = {}> = MutationProps<T> & {
  delay?: number
  duration?: number
  maxInstances?: number
  priority?: number
  persistOnSwitch?: boolean
  persistOnCombatEnd?: boolean
  statusId?: Id
}

export abstract class Modifier extends Mutation {
  delay?: number | undefined
  duration: number | undefined
  maxInstances: number | undefined
  priority: number
  persistOnSwitch: boolean
  persistOnCombatEnd: boolean
  statusId: Id | undefined

  get key(): string {
    return `${this.registryId}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: ModifierProps) {
    super(id, props)
    this.priority = props.priority ?? MODIFIER_PRIORITIES.DEFAULT
    this.delay = props.delay
    this.duration = props.duration
    this.maxInstances = props.maxInstances
    this.persistOnSwitch = props.persistOnSwitch || false
    this.persistOnCombatEnd = props.persistOnCombatEnd || false
    this.statusId = props.statusId
  }

  decrement() {
    if (this.duration !== undefined) {
      this.duration -= 1
    }
    if (this.delay !== undefined && this.delay > 0) {
      this.delay -= 1
    }
    return this
  }
}
