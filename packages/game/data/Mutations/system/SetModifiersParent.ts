import {
  CombatContext,
  Modifier,
  Mutation,
  MutationProps,
  Unit,
} from '../../../types'
import { SetModifiersParentId } from '../../Ids'

export class SetModifiersParent extends Mutation {
  modifiers: Modifier[]

  constructor(props: MutationProps<{ modifiers: Modifier[] }>) {
    super(SetModifiersParentId, props)
    this.modifiers = props.modifiers
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      modifiers: () => this.modifiers,
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return unit.id === this.parentId
  }
}
