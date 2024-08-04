import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const AccuracyDownParentId = ModifierId()

export class AccuracyDownParent extends Modifier {
  private offset: number

  constructor(props: ModifierProps<{ offset: number }>) {
    super(AccuracyDownParentId, props)
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        accuracy: stats.accuracy - this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
