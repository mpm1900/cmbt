import {
  CombatContext,
  Id,
  Modifier,
  MODIFIER_PRIORITIES,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AddModifiersToRegistryStaticAllOnUnitEnterId } from '../Ids'
import { AddModifiersToRegistryAll } from '../Modifiers'

export class AddModifiersToRegistryStaticAllOnUnitEnter extends Trigger {
  mods: Modifier[]

  constructor(props: TriggerProps<{ mods: Modifier[]; childRegistryId?: Id }>) {
    super(AddModifiersToRegistryStaticAllOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => [
        new AddModifiersToRegistryAll({
          registryId: props.childRegistryId,
          sourceId: props.sourceId,
          parentId: props.parentId,
          modifiers: props.mods,
        }),
      ],
    })
    this.priority = MODIFIER_PRIORITIES.IMMUNITIES
    this.mods = props.mods
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) &&
      !!newUnits?.find((u) => u.id === this.sourceId) &&
      unit.id === this.sourceId
    )
  }
}
