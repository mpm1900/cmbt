import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { DamageParentId } from '../Ids'

export class DamageParent extends Mutation {
  factor: number
  static: number
  evasionSuccess: boolean

  constructor(
    props: MutationProps<{
      factor?: number
      static?: number
      evasionSuccess?: boolean
    }>
  ) {
    super(DamageParentId, props)

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.evasionSuccess = props.evasionSuccess ?? false
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
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
