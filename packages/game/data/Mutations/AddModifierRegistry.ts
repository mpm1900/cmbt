import {
  CombatContext,
  Id,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { AddModifierRegistryId } from '../Ids'

export class AddModifierRegistry extends Mutation {
  private modifierId: Id

  constructor(props: MutationProps<{ modifierId: Id }>) {
    super(AddModifierRegistryId, props)
    this.modifierId = props.modifierId
  }

  resolve = (unit: Unit): Partial<Unit> => {
    if (unit.registry.modifiers.includes(this.modifierId)) return unit
    return {
      registry: {
        ...unit.registry,
        modifiers: [...unit.registry.modifiers, this.modifierId],
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
