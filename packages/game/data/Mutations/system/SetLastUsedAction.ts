import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../../types'
import { SetLastUsedActionId } from '../../Ids'

export class SetLastUsedAction extends Mutation {
  readonly actionId: string

  constructor(props: MutationProps<{ actionId: string }>) {
    super(SetLastUsedActionId, props)
    this.actionId = props.actionId
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      metadata: {
        ...unit.metadata,
        lastUsedActionId: this.actionId,
      },
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => super.filter(unit, ctx, args) && unit.id === this.parentId
}
