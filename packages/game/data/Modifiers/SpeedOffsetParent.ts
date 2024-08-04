import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const SpeedOffsetParentId = ModifierId()

export class SpeedOffsetParent extends Modifier {
  private offset: number

  constructor(props: ModifierProps<{ offset: number }>) {
    super(SpeedOffsetParentId, props)
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed + this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
