import {
  GameContext,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../types'

export const DamageParentId = MutationId()
export class DamageParent extends Mutation {
  private damage: number

  constructor(props: MutationProps<{ damage: number }>) {
    super(DamageParentId, props)
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
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
