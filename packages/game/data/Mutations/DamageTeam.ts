import {
  GameContext,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../types'

export const DamageTeamId = MutationId()

export class DamageTeam extends Mutation {
  private damage: number
  constructor(props: MutationProps & { damage: number }) {
    super(DamageTeamId, props)
    this.damage = props.damage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    const parent = ctx.units.find((u) => u.id === this.parentId)
    return super.filter(unit, ctx) && unit.teamId === parent?.teamId
  }
}
