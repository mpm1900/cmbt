import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { UpdateStatParentId } from '../Ids'

export class UpdateStatParent extends Modifier {
  stat: StatKey
  percentage?: boolean
  factor: number
  static: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.stat}${this.factor}/${this.static}`
  }

  constructor(
    props: ModifierProps<{
      stat: StatKey
      factor?: number
      static?: number
      percentage?: boolean
    }>
  ) {
    super(UpdateStatParentId, props)

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
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
