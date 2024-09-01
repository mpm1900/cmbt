import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { DefenseUpAllId } from '../Ids'

export class DefenseUpAll extends Modifier {
  constructor(props: ModifierProps) {
    super(DefenseUpAllId, props)
  }

  get key(): string {
    return `${this.id}`
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        defense: stats.defense + 10,
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
