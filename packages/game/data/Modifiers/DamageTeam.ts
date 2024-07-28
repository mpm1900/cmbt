import {
  GameContext,
  Id,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const DamageTeamId = ModifierId()

export class DamageTeam extends Modifier {
  private damage: number
  constructor(props: ModifierProps & { damage: number }) {
    super(DamageTeamId, props)
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
    const parent = ctx.units.find((u) => u.id === this.parentId)
    return super.filter(unit, ctx) && unit.teamId === parent?.teamId
  }
}
