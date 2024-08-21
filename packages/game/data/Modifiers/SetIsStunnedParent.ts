import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { SetIsStunnedParentId } from '../Ids'

export class SetIsStunnedParent extends Modifier {
  private isStunned?: boolean

  constructor(props: ModifierProps & { isStunned?: boolean }) {
    super(SetIsStunnedParentId, props)
    this.isStunned = props.isStunned
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        isStunned: this.isStunned || true,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
