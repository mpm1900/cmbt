import {
  CombatContext,
  Modifier,
  Mutation,
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

  filter = (unit: Unit, ctx: CombatContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
