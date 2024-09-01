import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../types'
import { DamageParentId } from '../Ids'

export class DamageParent extends Mutation {
  damage: number
  evasionSuccess: boolean

  constructor(
    props: MutationProps<{ damage: number; evasionSuccess?: boolean }>
  ) {
    super(DamageParentId, props)
    this.damage = props.damage
    this.evasionSuccess = props.evasionSuccess ?? false
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(values.damage + this.damage, 0),
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
