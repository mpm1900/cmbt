import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AddModifiersToRegistryAllId } from '../Ids'

export class AddModifiersToRegistryAll extends Modifier {
  private modifiers: Modifier[]

  constructor(props: ModifierProps<{ modifiers: Modifier[] }>) {
    super(AddModifiersToRegistryAllId, props)
    this.priority = MODIFIER_PRIORITIES.IMMUNITIES
    this.modifiers = props.modifiers
  }

  resolve = (unit: Unit): Partial<Unit> => {
    const modifierIdsToAdd = this.modifiers
      .filter((mod) => !unit.registry.modifiers.includes(mod.registryId))
      .map((mod) => mod.registryId)
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
    return super.filter(unit, ctx, args) && unit.flags.isActive
  }
}
