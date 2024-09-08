import { nanoid } from 'nanoid'
import { Id } from '.'
import { CombatContext } from './CombatContext'
import { Flags, Stats, Unit, Values } from './Unit'

export type MutationFilterArgs = {
  units?: Unit[]
}

export type MutationProps<T = {}> = T & {
  id?: Id
  registryId?: Id
  sourceId?: Id
  parentId?: Id
}

export abstract class Mutation {
  id: Id
  registryId: Id
  rtid: Id
  sourceId: Id | undefined
  parentId: Id | undefined

  abstract resolve(unit: Unit): Partial<Unit>
  get key(): string {
    return `${this.registryId}.${this.parentId ?? this.sourceId}`
  }

  constructor(id: Id, props: MutationProps) {
    this.id = id
    this.registryId = props.registryId ?? id
    this.rtid = nanoid()
    this.sourceId = props.sourceId
    this.parentId = props.parentId
  }

  filter(unit: Unit, ctx: CombatContext, args: MutationFilterArgs): boolean {
    const isImmune =
      unit.registry.modifiers.includes(this.registryId) ||
      unit.registry.modifiers.includes(this.id)
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
