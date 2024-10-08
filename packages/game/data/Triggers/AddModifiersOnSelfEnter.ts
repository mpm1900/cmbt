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
  makeModifiers: (unit: Unit | undefined) => Modifier[]
  targetsLabel: string

  constructor(
    props: TriggerProps & {
      makeModifiers: (unit: Unit | undefined) => Modifier[]
      targetsLabel: string
    }
  ) {
    super(AddModifiersOnSelfEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => props.makeModifiers(undefined),
    })

    this.makeModifiers = props.makeModifiers
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
