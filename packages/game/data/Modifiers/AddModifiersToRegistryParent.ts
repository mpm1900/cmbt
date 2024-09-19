import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AddModifiersToRegistryParentId } from '../Ids'

export class AddModifiersToRegistryParent extends Modifier {
  modifiers: Modifier[]

  constructor(props: ModifierProps<{ modifiers: Modifier[] }>) {
    super(AddModifiersToRegistryParentId, props)
    this.priority = MODIFIER_PRIORITIES.IMMUNITIES
    this.modifiers = props.modifiers
  }

  resolve = (unit: Unit): Partial<Unit> => {
    const modifierIdsToAdd = this.modifiers
      .filter((mod) => !unit.registry.modifiers.includes(mod.id))
      .map((mod) => mod.id)
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
