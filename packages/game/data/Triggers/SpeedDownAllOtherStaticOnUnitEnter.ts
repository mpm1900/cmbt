import {
  GameContext,
  Modifier,
  Trigger,
  TriggerId,
  TriggerProps,
  Unit,
} from '../../types'
import { SpeedDownAllOther } from '../Modifiers/SpeedDownAllOther'

export const SpeedDownAllOtherStaticOnUnitEnterId = TriggerId()

export class SpeedDownAllOtherStaticOnUnitEnter extends Trigger {
  private coef: number

  constructor(props: TriggerProps<{ coef: number }>) {
    super(SpeedDownAllOtherStaticOnUnitEnterId, {
      ...props,
      events: ['onUnitEnter'],
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

  fn = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        power: stats.power / this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
