import { Id } from '.'
import { Mutation, MutationProps } from './Mutation'

export const MODIFIER_PRIORITIES = {
  PRE: -1,
  DEFAULT: 0,
  STAGES: 1,
  APPLY_STAGES: 2,
  POST: 3,
  WIPE: 4,
  SET: 5,
}

export type ModifierProps<T = {}> = MutationProps<T> & {
  duration?: number
  maxInstances?: number
  priority?: number
  persistOnSwitch?: boolean
  persistOnCombatEnd?: boolean
  statusId?: Id
}

export abstract class Modifier extends Mutation {
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
