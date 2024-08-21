import {
  CombatContext,
  Modifier,
  Mutation,
  MutationProps,
  Unit,
} from '../../../types'
import { AddModifiersToParentId } from '../../Ids'

export class AddModifiersToParent extends Mutation {
  modifiers: Modifier[]

  constructor(props: MutationProps<{ modifiers: Modifier[] }>) {
    super(AddModifiersToParentId, props)
    this.modifiers = props.modifiers
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      modifiers: () => [...unit.modifiers(), ...this.modifiers],
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return unit.id === this.parentId
  }
}
