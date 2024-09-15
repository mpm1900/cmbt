import {
  CombatContext,
  MutationFilterArgs,
  StatKey,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AttackDownAllId, StatDownStaticAllOnUnitEnterId } from '../Ids'
import { UpdateStatAll } from '../Modifiers'

export class StatDownStaticAllOnUnitEnter extends Trigger {
  factor: number
  stat: StatKey

  constructor(props: TriggerProps<{ factor: number; stat: StatKey }>) {
    super(StatDownStaticAllOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => [
        new UpdateStatAll({
          sourceId: props.sourceId,
          parentId: props.sourceId,
          registryId: AttackDownAllId,
          stat: props.stat,
          factor: props.factor,
          persistOnCombatEnd: true,
        }),
      ],
    })

    this.factor = props.factor
    this.stat = props.stat
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) &&
      !!newUnits?.find((u) => u.id === this.sourceId) &&
      unit.id === this.sourceId
    )
  }
}
