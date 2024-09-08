import { choice } from '@/worlds/_utils'
import { EncounterContext } from '@repo/game/types'
import { CombatTrainingId } from '.'
import { CampEncounterShopId } from './CampEncounterShop'

export function CampEncounterTabs(ctx: EncounterContext) {
  return [
    choice({
      label: <>Shop</>,
      clearLog: ctx.activeNode.id !== CampEncounterShopId,
      active: ctx.activeNode.id === CampEncounterShopId,
      to: CampEncounterShopId,
    }),
    choice({
      clearLog: ctx.activeNode.id !== CombatTrainingId,
      active: ctx.activeNode.id === CombatTrainingId,
      label: <>Combat Training</>,
      to: CombatTrainingId,
    }),
  ]
}
