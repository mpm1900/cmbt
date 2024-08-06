import { CombatContext, Unit } from '../../types'
import { Mutation, MutationProps } from '../../types/Mutation'
import { MutationId } from '../Ids'

export const DamageAllId = MutationId()

export class DamageAll extends Mutation {
  private damage: number

  constructor(props: MutationProps<{ damage: number }>) {
    super(DamageAllId, props)
    this.damage = props.damage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Mutation.setValues(unit, (valuies) => ({
        damage: valuies.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
