import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { ProtectedParentId } from '../Ids'

export class ProtectedParent extends Modifier {
  constructor(props: ModifierProps) {
    super(ProtectedParentId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isProtected: true,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
