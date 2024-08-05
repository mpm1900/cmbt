import { nanoid } from 'nanoid'
import { Flags, CombatContext, Id, Stats, Unit, Values } from '.'

export const MutationId = () => `Mutation@${nanoid()}`

export type MutationProps<T = {}> = T & {
  id?: Id
  rid?: Id
  sourceId?: Id
  parentId?: Id
}

export abstract class Mutation {
  id: Id
  rid: Id
  rtid: Id
  sourceId: Id | undefined
  parentId: Id | undefined

  abstract resolve(unit: Unit): Partial<Unit>
  get key(): string {
    return `${this.rid}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: MutationProps) {
    this.id = id
    this.rid = props.rid ?? id
    this.rtid = nanoid()
    this.sourceId = props.sourceId
    this.parentId = props.parentId
  }

  filter(unit: Unit, ctx: CombatContext): boolean {
    const isImmune = unit.registry.modifiers.includes(this.id)
    const isActive = unit.flags.isActive
    return isActive && !isImmune
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
