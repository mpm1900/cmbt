import {
  CombatContext,
  Modifier,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { ReduceFocusParentId } from '../Ids'

export class ReduceFocusParent extends Mutation {
  offset: number

  constructor(props: MutationProps & { offset: number }) {
    super(ReduceFocusParentId, props)
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        focus: values.focus - this.offset,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => super.filter(unit, ctx, args) && unit.id === this.parentId
}
