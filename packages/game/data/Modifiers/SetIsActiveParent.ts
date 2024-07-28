import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const SetIsActiveParentId = ModifierId()

export class SetIsActiveParent extends Modifier {
  readonly isActive: boolean
  constructor(props: ModifierProps<{ isActive: boolean }>) {
    super(SetIsActiveParentId, props)
    this.isActive = props.isActive
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isActive: this.isActive,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return unit.id === this.parentId
  }
}
