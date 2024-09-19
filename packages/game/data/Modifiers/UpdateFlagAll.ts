import {
  CombatContext,
  FlagKey,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { UpdateFlagAllId } from '../Ids'

export class UpdateFlagAll extends Modifier {
  flag?: FlagKey
  value?: boolean

  get key(): string {
    return `${this.id}.${this.flag}.${this.value}`
  }

  constructor(props: ModifierProps & { flag?: FlagKey; value?: boolean }) {
    super(UpdateFlagAllId, props)

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
    return super.filter(unit, ctx, args) && unit.flags.isActive
  }
}
