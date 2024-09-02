import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { FireDamageUpParentId } from '../Ids'

export class FireDamageUpParent extends Modifier {
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}_${this.static}`
  }

  constructor(props: ModifierProps<{ factor?: number; static?: number }>) {
    super(FireDamageUpParentId, props)
    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        fireExpansion:
          stats.fireExpansion + this.factor * stats.fireExpansion + this.static,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
