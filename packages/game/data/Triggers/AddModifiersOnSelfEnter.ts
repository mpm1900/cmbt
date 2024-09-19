import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AddModifiersOnSelfEnterId } from '../Ids'

export class AddModifiersOnSelfEnter extends Trigger {
  modifiersToAdd: Modifier[]
  targetsLabel: string

  constructor(
    props: TriggerProps & { modifiersToAdd: Modifier[]; targetsLabel: string }
  ) {
    super(AddModifiersOnSelfEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => props.modifiersToAdd,
    })

    this.modifiersToAdd = props.modifiersToAdd
    this.targetsLabel = props.targetsLabel
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return (
      super.filter(unit, ctx, args) &&
      Trigger.OnSelfEnter(this, unit, ctx, args)
    )
  }
}
