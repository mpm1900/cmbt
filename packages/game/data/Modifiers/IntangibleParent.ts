import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { IntangibleParentId } from '../Ids'

export class IntangibleParent extends Modifier {
  constructor(props: ModifierProps) {
    super(IntangibleParentId, props)
    this.priority = MODIFIER_PRIORITIES.SET
  }

  resolve(unit: Unit): Partial<Unit> {
    return {
      flags: Modifier.setFlags(unit, () => ({
        isProtected: true,
        isHidden: true,
      })),
      stats: Modifier.setStats(unit, () => ({
        magicNegation: 100,
        physicalNegation: 100,
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
