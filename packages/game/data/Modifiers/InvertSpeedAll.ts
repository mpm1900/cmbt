import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { InvertSpeedAllId } from '../Ids'

export class InvertSpeedAll extends Modifier {
  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}`
  }

  constructor(props: ModifierProps) {
    super(InvertSpeedAllId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed * -1,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args)
  }
}
