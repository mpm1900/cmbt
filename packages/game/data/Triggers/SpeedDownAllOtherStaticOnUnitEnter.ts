import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { SpeedDownAllOtherStaticOnUnitEnterId } from '../Ids'
import { SpeedDownAllOther } from '../Modifiers/SpeedDownAllOther'

export class SpeedDownAllOtherStaticOnUnitEnter extends Trigger {
  factor: number

  constructor(props: TriggerProps<{ factor: number }>) {
    super(SpeedDownAllOtherStaticOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      modifiers: (ctx) => [
        new SpeedDownAllOther({
          sourceId: props.sourceId,
          parentId: props.sourceId,
          factor: 1.5,
        }),
      ],
    })
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => unit

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args)
  }
}
