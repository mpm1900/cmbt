import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { UpdateMagicArmorParentId } from '../Ids'

export class UpdateMagicArmorParent extends Mutation {
  factor: number
  static: number

  constructor(props: MutationProps<{ factor?: number; static?: number }>) {
    super(UpdateMagicArmorParentId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        magicArmor:
          values.magicArmor + values.magicArmor * this.factor + this.static,
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
