import {
  GameContext,
  Modifier,
  Trigger,
  TriggerId,
  TriggerProps,
  Unit,
} from '../../types'
import { PowerDownParent } from '../Modifiers'

export const PowerDownAllOtherOnUnitEnterId = TriggerId()

export class PowerDownAllOtherOnUnitEnter extends Trigger {
  private coef: number

  constructor(props: TriggerProps<{ coef: number }>) {
    super(PowerDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['onUnitEnter'],
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => this.filter(u, ctx) && u.id !== props.sourceId)
          .map(
            (u) =>
              new PowerDownParent({
                sourceId: props.sourceId,
                parentId: u.id,
                coef: 1.5,
              })
          ),
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
