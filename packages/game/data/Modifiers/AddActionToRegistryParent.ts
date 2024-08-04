import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const AddActionToRegistryParentId = ModifierId()

export class AddActionToRegistryParent extends Modifier {
  readonly actionId: string | undefined
  constructor(props: ModifierProps<{ actionId: string | undefined }>) {
    super(AddActionToRegistryParentId, props)

    this.actionId = props.actionId
    this.duration = props.duration
  }

  resolve = (unit: Unit): Partial<Unit> => {
    if (!this.actionId) return unit
    return {
      registry: {
        ...unit.registry,
        actions: [...unit.registry.actions, this.actionId],
      },
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean =>
    super.filter(unit, ctx) && unit.id === this.parentId
}
