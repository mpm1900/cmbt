import {
  CombatContext,
  FlagKey,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { UpdateFlagParentId } from '../Ids'

export class UpdateFlagParent extends Modifier {
  flag?: FlagKey
  value?: boolean

  constructor(props: ModifierProps & { flag?: FlagKey; value?: boolean }) {
    super(UpdateFlagParentId, props)

    this.flag = props.flag
    this.value = props.value
  }

  resolve = (unit: Unit): Partial<Unit> => {
    if (!this.flag) return unit
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        [this.flag!]: this.value,
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
