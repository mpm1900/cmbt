import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const DefenseUpAllId = ModifierId()

export class DefenseUpAll extends Modifier {
  constructor(props: ModifierProps) {
    super(DefenseUpAllId, props)
  }

  get key(): string {
    return `${this.id}`
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        defense: stats.defense + 10,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
