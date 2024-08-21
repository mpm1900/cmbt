import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { RemoveMagicArmorParentId } from '../Ids'

export class RemoveMagicArmorParent extends Mutation {
  private amount: number

  constructor(props: MutationProps<{ amount: number }>) {
    super(RemoveMagicArmorParentId, props)
    this.amount = props.amount
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        magicArmor: values.magicArmor - this.amount,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
