import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { DamagePercentTeamId } from '../Ids'

export class DamagePercentTeam extends Mutation {
  factor: number

  constructor(props: MutationProps & { factor: number }) {
    super(DamagePercentTeamId, props)
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.round(values.damage + unit.stats.health * this.factor),
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
