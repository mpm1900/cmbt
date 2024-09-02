import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { HealParentId } from '../Ids'

export class HealParent extends Mutation {
  damageFactor: number
  healthFactor: number
  static: number

  constructor(
    props: MutationProps<{
      damageFactor?: number
      healthFactor?: number
      static?: number
    }>
  ) {
    super(HealParentId, props)

    this.damageFactor = props.damageFactor ?? 0
    this.healthFactor = props.healthFactor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(
          Math.round(
            values.damage -
              this.damageFactor * values.damage -
              this.healthFactor * unit.stats.health -
              this.static
          ),
          0
        ),
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return unit.id === this.parentId
  }
}
