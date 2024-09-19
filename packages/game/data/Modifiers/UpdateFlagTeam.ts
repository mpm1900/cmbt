import {
  CombatContext,
  FlagKey,
  Id,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { getTeamIdValue } from '../../utils'
import { UpdateFlagTeamId } from '../Ids'

export class UpdateFlagTeam extends Modifier {
  teamId?: Id
  notTeamId?: Id
  flag?: FlagKey
  value?: boolean

  get key(): string {
    return `${this.id}.${this.flag}.${this.value}`
  }

  constructor(
    props: ModifierProps & {
      teamId?: Id
      notTeamId?: Id
      flag?: FlagKey
      value?: boolean
    }
  ) {
    super(UpdateFlagTeamId, props)

    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
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
    return (
      super.filter(unit, ctx, args) &&
      unit.flags.isActive &&
      getTeamIdValue(unit.teamId, this.teamId, this.notTeamId)
    )
  }
}
