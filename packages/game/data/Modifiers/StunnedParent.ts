import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { StunnedParentId } from '../Ids'

export class StunnedParent extends Modifier {
  private isStunned?: boolean

  constructor(props: ModifierProps & { isStunned?: boolean }) {
    super(StunnedParentId, props)
    this.isStunned = props.isStunned
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isStunned: this.isStunned || true,
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
