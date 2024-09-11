import { choice } from '@/worlds/_utils'
import { EncounterContext } from '@repo/game/types'
import { CampEncounterCombatTrainingId } from './CampEncounterCombatTraining'
import { CampEncounterInnId } from './CampEncounterInn'

export function CampEncounterTabs(ctx: EncounterContext) {
  return [
    choice({
      label: <>Inn</>,
      active: ctx.activeNode.id === CampEncounterInnId,
      to: CampEncounterInnId,
    }),
    choice({
      active: ctx.activeNode.id === CampEncounterCombatTrainingId,
      label: <>Combat Training</>,
      to: CampEncounterCombatTrainingId,
    }),
  ]
}
