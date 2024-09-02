import { CombatContext, Unit } from '../../types'
import {
  Mutation,
  MutationFilterArgs,
  MutationProps,
} from '../../types/Mutation'
import { DamageAllId } from '../Ids'

export class DamageAll extends Mutation {
  factor: number
  static: number

  constructor(props: MutationProps<{ factor?: number; static?: number }>) {
    super(DamageAllId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(
          Math.round(
            values.damage + unit.stats.health * this.factor + this.static
          ),
          0
        ),
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
