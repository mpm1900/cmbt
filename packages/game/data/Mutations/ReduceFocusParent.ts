import {
  GameContext,
  Modifier,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../types'

export const ReduceFocusParentId = MutationId()

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

  filter = (unit: Unit, ctx: GameContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
