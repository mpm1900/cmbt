import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../../types'

export const SetLastUsedActionId = ModifierId()

export class SetLastUsedAction extends Modifier {
  readonly actionId: string

  constructor(props: ModifierProps<{ actionId: string }>) {
    super(SetLastUsedActionId, props)
    this.actionId = props.actionId
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      metadata: {
        ...unit.metadata,
        lastUsedActionId: this.actionId,
      },
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
