import {
  CombatContext,
  Id,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { AddModifiersToRegistryParentMutateId } from '../Ids'

export class AddModifiersToRegistryParentMutate extends Mutation {
  private modifierIds: Id[]

  constructor(props: MutationProps<{ modifierIds: Id[] }>) {
    super(AddModifiersToRegistryParentMutateId, props)
    this.modifierIds = props.modifierIds
  }

  resolve = (unit: Unit): Partial<Unit> => {
    const modifierIdsToAdd = this.modifierIds.filter(
      (mid) => !unit.registry.modifiers.includes(mid)
    )
    return {
      registry: {
        ...unit.registry,
        modifiers: [...unit.registry.modifiers, ...modifierIdsToAdd],
      },
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
