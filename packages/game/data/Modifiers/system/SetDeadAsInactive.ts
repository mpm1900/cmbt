import { GameContext, Modifier, ModifierId, Unit } from '../../../types'
import { isUnitAliveCtx } from '../../../utils'

export const SetDeadAsInactiveId = ModifierId()

export class SetDeadAsInactive extends Modifier {
  constructor() {
    super(SetDeadAsInactiveId, {})
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isActive: false,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    const base = unit.flags.isActive
    return base && !isUnitAliveCtx(unit.id, ctx)
  }
}
