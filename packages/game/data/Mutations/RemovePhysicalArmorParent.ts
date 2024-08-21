import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { RemovePhysicalArmorParentId } from '../Ids'

export class RemovePhysicalArmorParent extends Mutation {
  private amount: number

  constructor(props: MutationProps<{ amount: number }>) {
    super(RemovePhysicalArmorParentId, props)
    this.amount = props.amount
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        physicalArmor: values.physicalArmor - this.amount,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
