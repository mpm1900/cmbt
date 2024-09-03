import {
  CombatContext,
  Id,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { UpdateStatParentId } from '../Ids'

export class UpdateStatTeam extends Modifier {
  teamId: Id
  stat: StatKey
  percentage?: boolean
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.stat}${this.factor}/${this.static}`
  }

  constructor(
    props: ModifierProps<{
      teamId: Id
      stat: StatKey
      factor?: number
      static?: number
      percentage?: boolean
    }>
  ) {
    super(UpdateStatParentId, props)

    this.teamId = props.teamId
    this.stat = props.stat
    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.percentage = props.percentage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        [this.stat]:
          stats[this.stat] + stats[this.stat] * this.factor + this.static,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.teamId === this.teamId
  }
}
