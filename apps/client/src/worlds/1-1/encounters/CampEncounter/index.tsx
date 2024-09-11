import { Narration } from '@/components/encounter/Narration'
import { Encounter } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { Chiblee, ChibleeId } from '../../npcs/Chiblee'
import {
  CampEncounterCombatTraining01,
  CampEncounterCombatTraining02,
  CampEncounterCombatTrainingCombatEnd,
  CampEncounterCombatTrainingCombatEndId,
  CampEncounterCombatTrainingCombatStart,
} from './CampEncounterCombatTraining'
import { CampEncounterInn } from './CampEncounterInn'
import { CampEncounterShop } from './CampEncounterShop'
import { CampEncounterStart, CampEncounterStartId } from './CampEncounterStart'

export const CampEncounterId = nanoid()
export const CampEncounter = (): Encounter => {
  return {
    id: CampEncounterId,
    setup: (ctx, props) => {
      if (ctx.activeNode.id !== CampEncounterCombatTrainingCombatEndId) {
        ctx.clearLog()
        ctx.updateEncounter((e) => ({
          activeNodeId: CampEncounterStartId,
          visitedNodeIds: [],
        }))

        if (!ctx.npcs.find((c) => c.id === ChibleeId)) {
          ctx.addNpc(Chiblee)
        }

        if (props.encounterVisitCount === 1) {
          ctx.log(
            <Narration>
              Your party finds their way to a friendly village on the outskirts
              of the forest. As you look around you see a small Inn and a group
              of soldiers training in the courtyard.
            </Narration>
          )
        } else {
          ctx.log(
            <Narration>Your party returns to this outskirt village.</Narration>
          )
        }
      }
    },
    activeNodeId: CampEncounterStartId,
    nodes: [
      CampEncounterStart,
      CampEncounterInn,
      CampEncounterShop,
      CampEncounterCombatTraining01,
      CampEncounterCombatTraining02,
      CampEncounterCombatTrainingCombatStart,
      CampEncounterCombatTrainingCombatEnd,
    ],
    visitedNodeIds: [],
    values: {},
  }
}
