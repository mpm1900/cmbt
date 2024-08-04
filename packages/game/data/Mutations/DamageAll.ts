import {
  GameContext,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../types'

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

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
