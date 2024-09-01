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
  dynamic: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}_${this.dynamic}`
  }

  constructor(props: ModifierProps<{ factor?: number; dynamic?: number }>) {
    super(FireDamageUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.dynamic = props.dynamic ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        fireExpansion:
          stats.fireExpansion * this.factor +
          this.dynamic * stats.fireExpansion,
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
