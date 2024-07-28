import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const DamageAllId = ModifierId()

export class DamageAll extends Modifier {
  private damage: number

  constructor(props: ModifierProps<{ damage: number }>) {
    super(DamageAllId, props)
    this.damage = props.damage
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (valuies) => ({
        damage: valuies.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
