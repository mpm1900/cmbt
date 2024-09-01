import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { DamageTeamId } from '../Ids'

export class DamageTeam extends Mutation {
  damage: number

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

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const parent = ctx.units.find((u) => u.id === this.parentId)
    return super.filter(unit, ctx, args) && unit.teamId === parent?.teamId
  }
}
