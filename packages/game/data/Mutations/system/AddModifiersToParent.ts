import {
  GameContext,
  Modifier,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../../types'

export const AddModifiersToParentId = MutationId()

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

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return unit.id === this.parentId
  }
}
