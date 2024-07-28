import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const DamageParentId = ModifierId()
export class DamageParent extends Modifier {
  private damage: number

  constructor(props: ModifierProps<{ damage: number }>) {
    super(DamageParentId, props)
    this.damage = props.damage
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
