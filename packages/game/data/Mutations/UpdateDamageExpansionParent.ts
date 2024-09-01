import {
  CombatContext,
  DamageType,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  StatKey,
  Unit,
} from '../../types'
import { UpdateDamageExpansionParentId } from '../Ids'

export class UpdateDamageExpansionParent extends Mutation {
  damageType: DamageType
  offset: number
  factor: number

  constructor(
    props: MutationProps<{
      damageType: DamageType
      offset?: number
      factor?: number
    }>
  ) {
    super(UpdateDamageExpansionParentId, props)
    this.damageType = props.damageType
    this.offset = props.offset ?? 0
    this.factor = props.factor ?? 1
  }

  resolve = (unit: Unit): Partial<Unit> => {
    const key: StatKey = `${this.damageType}Expansion`
    return {
      stats: Mutation.setStats(unit, (stats) => ({
        [key]: stats[key] * this.factor + this.offset,
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
