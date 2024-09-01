import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { SetIsInspectedAllId } from '../Ids'

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

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.teamId !== ctx.user
  }
}
