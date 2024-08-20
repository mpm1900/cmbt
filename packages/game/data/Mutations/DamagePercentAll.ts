import { CombatContext, Unit } from '../../types'
import { Mutation, MutationProps } from '../../types/Mutation'
import { MutationId } from '../Ids'

export const DamagePercentAllId = MutationId()

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

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
