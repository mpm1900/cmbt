import {
  GameContext,
  Id,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const InvertSpeedAllId = ModifierId()

export class InvertSpeedAll extends Modifier {
  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}`
  }

  constructor(props: ModifierProps) {
    super(InvertSpeedAllId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed * -1,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
