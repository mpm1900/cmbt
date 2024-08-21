import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { PowerDownAllOtherOnUnitEnterId } from '../Ids'
import { PhysicalAttackDownParent } from '../Modifiers'

export class PowerDownAllOtherOnUnitEnter extends Trigger {
  private factor: number

  constructor(props: TriggerProps<{ factor: number }>) {
    super(PowerDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => super.filter(u, ctx) && u.id !== props.sourceId)
          .map(
            (u) =>
              new PhysicalAttackDownParent({
                sourceId: props.sourceId,
                parentId: u.id,
                factor: 1.5,
              })
          ),
    })
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical / this.factor,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.sourceId
  }
}
