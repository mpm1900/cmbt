import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { TriggerId } from '../Ids'
import { PhysicalAttackDownParent } from '../Modifiers'

export const PowerDownAllOtherOnUnitEnterId = TriggerId()

export class PowerDownAllOtherOnUnitEnter extends Trigger {
  private coef: number

  constructor(props: TriggerProps<{ coef: number }>) {
    super(PowerDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => this.filter(u, ctx) && u.id !== props.sourceId)
          .map(
            (u) =>
              new PhysicalAttackDownParent({
                sourceId: props.sourceId,
                parentId: u.id,
                coef: 1.5,
              })
          ),
    })
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical / this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
