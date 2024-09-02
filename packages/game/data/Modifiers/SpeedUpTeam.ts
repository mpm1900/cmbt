import {
  CombatContext,
  Id,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { SpeedUpTeamId } from '../Ids'

export class SpeedUpTeam extends Modifier {
  teamId: Id
  factor: number
  static: number

  constructor(
    props: ModifierProps<{ teamId: Id; factor?: number; static?: number }>
  ) {
    super(SpeedUpTeamId, props)
    this.teamId = props.teamId
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
    return unit.teamId === this.teamId
  }
}
