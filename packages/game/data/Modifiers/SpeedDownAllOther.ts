import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { SpeedDownAllOtherId } from '../Ids'

export class SpeedDownAllOther extends Modifier {
  factor: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}`
  }

  constructor(props: ModifierProps<{ factor: number }>) {
    super(SpeedDownAllOtherId, props)
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed / this.factor,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id !== this.parentId
  }
}
