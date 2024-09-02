import {
  CombatContext,
  Modifier,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { UpdateFocusParentId } from '../Ids'

export class UpdateFocusParent extends Mutation {
  factor: number
  static: number

  constructor(props: MutationProps & { factor?: number; static?: number }) {
    super(UpdateFocusParentId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        focus: values.focus + unit.stats.focus * this.factor + this.static,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => super.filter(unit, ctx, args) && unit.id === this.parentId
}
