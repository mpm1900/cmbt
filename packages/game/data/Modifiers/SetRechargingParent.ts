import {
  CombatContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const SetRechargingParentId = ModifierId()
export class SetRechargingParent extends Modifier {
  constructor(props: ModifierProps) {
    super(SetRechargingParentId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isRecharging: true,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
