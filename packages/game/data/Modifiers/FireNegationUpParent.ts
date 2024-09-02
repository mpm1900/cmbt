import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { FireNegationUpParentId } from '../Ids'

export class FireNegationUpParent extends Modifier {
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}_${this.static}`
  }

  constructor(props: ModifierProps<{ factor?: number; static?: number }>) {
    super(FireNegationUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        fireNegation:
          stats.fireNegation + this.factor * stats.fireNegation + this.static,
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
