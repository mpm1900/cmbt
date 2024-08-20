import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { MutationId } from '../Ids'

export const DamagePercentParentId = MutationId()
export class DamagePercentParent extends Mutation {
  factor: number
  evasionSuccess: boolean

  constructor(
    props: MutationProps<{ factor: number; evasionSuccess?: boolean }>
  ) {
    super(DamagePercentParentId, props)
    this.factor = props.factor
    this.evasionSuccess = props.evasionSuccess ?? false
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.round(values.damage + unit.stats.health * this.factor),
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
