import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { UpdatePhysicalArmorParentId } from '../Ids'

export class UpdatePhysicalArmorParent extends Mutation {
  factor: number
  static: number

  constructor(props: MutationProps<{ factor?: number; static?: number }>) {
    super(UpdatePhysicalArmorParentId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        physicalArmor:
          values.physicalArmor +
          values.physicalArmor * this.factor +
          this.static,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
