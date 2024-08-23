import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { HealParentId } from '../Ids'

export class HealParent extends Mutation {
  offset: number
  factor: number

  constructor(props: MutationProps<{ offset?: number; factor?: number }>) {
    super(HealParentId, props)
    this.offset = props.offset ?? 0
    this.factor = props.factor ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (values) => ({
        damage: Math.max(
          Math.round(
            values.damage - this.factor * unit.stats.health - this.offset
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
