import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { HealParentOnTurnEndId } from '../Ids'

export class HealParentOnTurnEnd extends Trigger {
  offset: number
  factor: number

  constructor(props: TriggerProps<{ offset?: number; factor?: number }>) {
    super(HealParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })
    this.offset = props.offset ?? 0
    this.factor = props.factor ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(
          Math.round(
            values.damage - this.factor * unit.stats.health - this.offset
          ),
          0
        ),
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
