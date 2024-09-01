import { CombatContext, Unit } from '../../types'
import {
  Mutation,
  MutationFilterArgs,
  MutationProps,
} from '../../types/Mutation'
import { DamagePercentAllId } from '../Ids'

export class DamagePercentAll extends Mutation {
  factor: number

  constructor(props: MutationProps<{ factor: number }>) {
    super(DamagePercentAllId, props)
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.round(values.damage + unit.stats.health * this.factor),
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
