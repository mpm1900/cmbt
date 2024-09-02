import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { SpeedUpTeamId } from '../Ids'

export class SpeedUpTeam extends Modifier {
  factor: number
  static: number

  constructor(props: ModifierProps<{ factor?: number; static?: number }>) {
    super(SpeedUpTeamId, props)
    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed + stats.speed * this.factor + this.static,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const parent = ctx.units.find((u) => u.id === this.parentId)
    return super.filter(unit, ctx, args) && unit.teamId === parent?.teamId
  }
}
