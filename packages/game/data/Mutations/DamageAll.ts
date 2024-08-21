import { CombatContext, Unit } from '../../types'
import { Mutation, MutationProps } from '../../types/Mutation'
import { DamageAllId } from '../Ids'

export class DamageAll extends Mutation {
  damage: number

  constructor(props: MutationProps<{ damage: number }>) {
    super(DamageAllId, props)
    this.damage = props.damage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
