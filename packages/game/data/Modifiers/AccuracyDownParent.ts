import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AccuracyDownParentId } from '../Ids'

export class AccuracyDownParent extends Modifier {
  static: number

  constructor(props: ModifierProps<{ static: number }>) {
    super(AccuracyDownParentId, props)
    this.static = props.static
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        accuracy: stats.accuracy - this.static,
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
