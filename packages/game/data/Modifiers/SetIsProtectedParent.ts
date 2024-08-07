import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Ids'

export const SetIsProtectedParentId = ModifierId()

export class SetIsProtectedParent extends Modifier {
  constructor(props: ModifierProps) {
    super(SetIsProtectedParentId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isProtected: true,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
