import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { HealParentOnUnitSwitchId } from '../Ids'

export class HealParentOnUnitSwitch extends Trigger {
  offset: number
  factor: number

  constructor(props: TriggerProps<{ offset?: number; factor?: number }>) {
    super(HealParentOnUnitSwitchId, {
      ...props,
      events: ['on Unit Switch Out'],
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
    return (
      unit.id === this.parentId &&
      (!args.units?.length || !!args.units?.find((u) => u.id === unit.id))
    )
  }
}
