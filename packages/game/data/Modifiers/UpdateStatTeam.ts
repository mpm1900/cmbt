import {
  CombatContext,
  Id,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { getTeamIdValue } from '../../utils'
import { UpdateStatTeamId } from '../Ids'

export class UpdateStatTeam extends Modifier {
  teamId?: Id
  notTeamId?: Id
  stat?: StatKey
  percentage?: boolean
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.teamId ?? this.notTeamId}@${this.stat}${this.factor}/${this.static}`
  }

  constructor(
    props: ModifierProps<{
      teamId?: Id
      notTeamId?: Id
      stat?: StatKey
      factor?: number
      static?: number
      percentage?: boolean
    }>
  ) {
    super(UpdateStatTeamId, props)

    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
    this.stat = props.stat
    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.percentage = props.percentage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    if (!this.stat) return unit
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        [this.stat!]:
          stats[this.stat!] + stats[this.stat!] * this.factor + this.static,
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
