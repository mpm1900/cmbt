import { CombatContext, Mutation, MutationProps, Unit } from '../../../types'
import { MutationId } from '../../Ids'

export const IncrementActiveTurnsId = MutationId()

export class IncrementActiveTurns extends Mutation {
  constructor(props: MutationProps<{ isActive: boolean }>) {
    super(IncrementActiveTurnsId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      metadata: {
        ...unit.metadata,
        activeTurns: unit.metadata.activeTurns + 1,
      },
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return unit.flags.isActive
  }
}
