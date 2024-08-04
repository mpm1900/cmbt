import {
  GameContext,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../../types'
import { isUnitAliveCtx } from '../../../utils'

export const SetDeadAsInactiveId = MutationId()

export class SetDeadAsInactive extends Mutation {
  constructor(props: MutationProps = {}) {
    super(SetDeadAsInactiveId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Mutation.setFlags(unit, (flags) => ({
        isActive: false,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    const base = unit.flags.isActive
    return base && !isUnitAliveCtx(unit.id, ctx)
  }
}
