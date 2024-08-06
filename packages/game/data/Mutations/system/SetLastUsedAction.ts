import { CombatContext, Mutation, MutationProps, Unit } from '../../../types'
import { MutationId } from '../../Ids'

export const SetLastUsedActionId = MutationId()

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

  filter = (unit: Unit, ctx: CombatContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
