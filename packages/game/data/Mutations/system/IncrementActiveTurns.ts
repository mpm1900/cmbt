import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../../types'
import { IncrementActiveTurnsId } from '../../Ids'

export class IncrementActiveTurns extends Mutation {
  constructor(props: MutationProps) {
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

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return unit.flags.isActive
  }
}
