import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { DamageTeamId } from '../Ids'

export class DamageTeam extends Mutation {
  factor: number
  static: number

  constructor(props: MutationProps & { factor?: number; static?: number }) {
    super(DamageTeamId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(
          Math.round(
            values.damage + unit.stats.health * this.factor + this.static
          ),
          0
        ),
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const parent = ctx.units.find((u) => u.id === this.parentId)
    return super.filter(unit, ctx, args) && unit.teamId === parent?.teamId
  }
}
