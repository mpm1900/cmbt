import { choice } from '@/worlds/_utils'
import { EncounterContext } from '@repo/game/types'
import {
  CampEncounterCombatTraining01Id,
  CampEncounterCombatTraining02Id,
  CampEncounterCombatTrainingCombatEndId,
  CampEncounterCombatTrainingCombatStartId,
} from './CampEncounterCombatTraining'
import { CampEncounterInnId } from './CampEncounterInn'

export function CampEncounterTabs(ctx: EncounterContext) {
  const nid = ctx.activeNode.id
  return [
    choice({
      label: <>Inn</>,
      active: nid === CampEncounterInnId,
      to: CampEncounterInnId,
    }),
    choice({
      active:
        nid === CampEncounterCombatTraining01Id ||
        nid === CampEncounterCombatTraining02Id ||
        nid === CampEncounterCombatTrainingCombatStartId ||
        nid === CampEncounterCombatTrainingCombatEndId,
      label: <>Combat Training</>,
      to: CampEncounterCombatTraining02Id,
    }),
  ]
}
