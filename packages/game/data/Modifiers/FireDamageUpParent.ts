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
  offset: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}_${this.offset}`
  }

  constructor(props: ModifierProps<{ factor?: number; offset?: number }>) {
    super(FireDamageUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.offset = props.offset ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        fireExpansion:
          stats.fireExpansion * this.factor + this.offset * stats.fireExpansion,
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
