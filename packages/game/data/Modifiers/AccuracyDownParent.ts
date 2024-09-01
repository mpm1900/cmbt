import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AccuracyDownParentId } from '../Ids'

export class AccuracyDownParent extends Modifier {
  private offset: number

  constructor(props: ModifierProps<{ offset: number }>) {
    super(AccuracyDownParentId, props)
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        accuracy: stats.accuracy - this.offset,
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
