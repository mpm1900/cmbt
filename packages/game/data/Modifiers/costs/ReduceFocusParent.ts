import {
  GameContext,
  Id,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../../types'

export const ReduceFocusParentId = ModifierId()

export class ReduceFocusParent extends Modifier {
  offset: number

  constructor(props: Omit<ModifierProps, 'parentId'> & { offset: number }) {
    super(ReduceFocusParentId, { ...props, parentId: props.sourceId })
    this.offset = props.offset
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        focus: values.focus - this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
