import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { RemoveAllDamageParentId } from '../Ids'

export class RemoveAllDamageParent extends Mutation {
  constructor(props: MutationProps) {
    super(RemoveAllDamageParentId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: 0,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
