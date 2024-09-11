import {
  CombatContext,
  Id,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AddModifiersToRegistryAllId } from '../Ids'

export class AddModifiersToRegistryAll extends Modifier {
  private modifierIds: Id[]

  constructor(props: ModifierProps<{ modifierIds: Id[] }>) {
    super(AddModifiersToRegistryAllId, props)
    this.priority = MODIFIER_PRIORITIES.IMMUNITIES
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
    return super.filter(unit, ctx, args)
  }
}
