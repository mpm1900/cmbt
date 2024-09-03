import {
  Action,
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { AddActionParentId } from '../Ids'

export class AddActionParent extends Modifier {
  action: (u: Unit) => Action

  constructor(props: ModifierProps<{ action: (u: Unit) => Action }>) {
    super(AddActionParentId, props)

    this.action = props.action
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      actions: [...unit.actions, this.action(unit)],
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => super.filter(unit, ctx, args) && unit.id === this.parentId
}
