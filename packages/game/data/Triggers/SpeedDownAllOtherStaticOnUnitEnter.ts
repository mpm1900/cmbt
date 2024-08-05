import { CombatContext, Trigger, TriggerProps, Unit } from '../../types'
import { TriggerId } from '../Id'
import { SpeedDownAllOther } from '../Modifiers/SpeedDownAllOther'

export const SpeedDownAllOtherStaticOnUnitEnterId = TriggerId()

export class SpeedDownAllOtherStaticOnUnitEnter extends Trigger {
  private coef: number

  constructor(props: TriggerProps<{ coef: number }>) {
    super(SpeedDownAllOtherStaticOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      modifiers: (ctx) => [
        new SpeedDownAllOther({
          sourceId: props.sourceId,
          parentId: props.sourceId,
          coef: 1.5,
        }),
      ],
    })
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => unit

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
