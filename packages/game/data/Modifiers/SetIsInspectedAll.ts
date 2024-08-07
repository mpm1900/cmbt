import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Ids'

export const SetIsInspectedAllId = ModifierId()
export class SetIsInspectedAll extends Modifier {
  private isInspected?: boolean

  constructor(props: ModifierProps & { isInspected?: boolean }) {
    super(SetIsInspectedAllId, props)
    this.isInspected = props.isInspected
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isInspected: this.isInspected || true,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.teamId !== ctx.user
  }
}
