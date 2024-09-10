import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  MutationProps,
  Unit,
} from '../../../types'
import { IncrementInactiveTurnsId } from '../../Ids'

export class IncrementInactiveTurns extends Mutation {
  constructor(props: MutationProps) {
    super(IncrementInactiveTurnsId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      metadata: {
        ...unit.metadata,
        inactiveTurns: unit.metadata.inactiveTurns + 1,
      },
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return !unit.flags.isActive
  }
}
