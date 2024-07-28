import { nanoid } from 'nanoid'
import { Flags, GameContext, Id, Stats, Unit, Values } from '.'

export const ModifierId = () => `Modifier@${nanoid()}`

export type ModifierProps<T = {}> = T & {
  id?: Id
  rid?: Id
  sourceId?: Id
  parentId?: Id
  maxInstances?: number
  duration?: number
  priority?: number
}

export abstract class Modifier {
  id: Id
  rid: Id
  rtid: Id
  sourceId: Id | undefined
  parentId: Id | undefined
  maxInstances: number | undefined
  duration: number | undefined
  priority: number

  abstract fn(unit: Unit): Partial<Unit>
  get key(): string {
    return `${this.rid}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: ModifierProps) {
    this.id = id
    this.rid = props.rid ?? id
    this.rtid = nanoid()
    this.sourceId = props.sourceId
    this.parentId = props.parentId
    this.priority = props.priority ?? 0
    this.duration = props.duration
    this.maxInstances = props.maxInstances
  }

  filter(unit: Unit, ctx: GameContext): boolean {
    const isImmune = unit.registry.modifiers.includes(this.id)
    const isActive = unit.flags.isActive
    return isActive && !isImmune
  }

  decrementDuration() {
    if (this.duration !== undefined) {
      this.duration -= 1
    }
    return this
  }

  static setStats(unit: Unit, fn: (stats: Stats) => Partial<Stats>): Stats {
    return {
      ...unit.stats,
      ...fn(unit.stats),
    }
  }

  static setValues(
    unit: Unit,
    fn: (values: Values) => Partial<Values>
  ): Values {
    return {
      ...unit.values,
      ...fn(unit.values),
    }
  }

  static setFlags(unit: Unit, fn: (values: Flags) => Partial<Flags>): Flags {
    return {
      ...unit.flags,
      ...fn(unit.flags),
    }
  }
}
