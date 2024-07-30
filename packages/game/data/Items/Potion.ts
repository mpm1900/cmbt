import { ActionResult, GameContext, Unit } from '../../types'
import { Item, ItemId, ItemProps } from '../../types/Item'
import { DamageParent } from '../Modifiers'

export const PotionId = ItemId()

export class Potion extends Item {
  maxTargetCount: number = 1
  constructor(props: ItemProps) {
    super(PotionId, props)
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return unit.teamId === this.teamId
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
    const target = targets[0]
    return {
      action: this,
      source,
      targets,
      mutations: [
        new DamageParent({
          sourceId: source.id,
          parentId: target.id,
          damage: -20,
        }),
      ],
      modifiers: [],
    }
  }
}
