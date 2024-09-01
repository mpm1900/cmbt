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
  offset: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}`
  }

  constructor(props: ModifierProps<{ factor?: number; offset?: number }>) {
    super(FireNegationUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.offset = props.offset ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        fireNegation: stats.fireNegation * this.factor + this.offset,
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
