import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
  ValueKey,
} from '../../types'
import { UpdateValueParentId } from '../Ids'

export class UpdateValueParent extends Mutation {
  valueKey: ValueKey
  factor: number
  static: number

  constructor(
    props: MutationProps<{
      factor?: number
      static?: number
      valueKey: ValueKey
    }>
  ) {
    super(UpdateValueParentId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.valueKey = props.valueKey
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        [this.valueKey]: Math.max(
          Math.round(
            values[this.valueKey] +
              values[this.valueKey] * this.factor +
              this.static
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
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
