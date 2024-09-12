import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { InspectedAllId } from '../Ids'

export class InspectedAll extends Modifier {
  private isInspected?: boolean

  constructor(props: ModifierProps & { isInspected?: boolean }) {
    super(InspectedAllId, props)
    this.isInspected = props.isInspected
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isInspected: this.isInspected || true,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return (
      super.filter(unit, ctx, args) &&
      unit.teamId !== ctx.user &&
      unit.flags.isActive
    )
  }
}
