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
  flagKey: FlagKey
  value: boolean

  constructor(props: ModifierProps & { flagKey: FlagKey; value: boolean }) {
    super(UpdateFlagParentId, props)

    this.flagKey = props.flagKey
    this.value = props.value
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Modifier.setFlags(unit, (flags) => ({
        [this.flagKey]: this.value,
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
