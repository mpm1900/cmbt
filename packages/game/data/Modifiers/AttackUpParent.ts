import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AttackUpParentId } from '../Ids'

export class AttackUpParent extends Modifier {
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}${this.static}`
  }

  constructor(props: ModifierProps<{ factor?: number; static?: number }>) {
    super(AttackUpParentId, props)
    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        attack: stats.attack + stats.attack * this.factor + this.static,
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
