import { ActionRenderResult, GameContext, Unit } from '../../types'
import { Item, ItemId, ItemProps } from '../../types/Item'

export const PotionId = ItemId()

export class Potion extends Item {
  maxTargetCount: number = 1
  constructor(props: ItemProps) {
    super(PotionId, props)
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext
  ): ActionRenderResult => {
    return {
      source,
      targets,
      mutations: [],
      modifiers: [],
    }
  }
}
