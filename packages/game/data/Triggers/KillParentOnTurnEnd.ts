import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { KillParentOnTurnEndId } from '../Ids'

export class KillParentOnTurnEnd extends Trigger {
  constructor(props: TriggerProps) {
    super(KillParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => {
        return { damage: unit.stats.health }
      }),
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
