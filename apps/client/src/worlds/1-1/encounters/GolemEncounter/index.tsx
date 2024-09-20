import { Encounter } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GolemEncounterPostCombat } from './GolemEncounterPostCombat'
import { GolemEncounterPreCombat } from './GolemEncounterPreCombat'
import {
  GolemEncounterStart,
  GolemEncounterStartId,
} from './GolemEncounterStart'

export const GolemEncounterId = nanoid()
export function GolemEncounter(): Encounter {
  return {
    id: GolemEncounterId,
    setup: (ctx, props) => {
      ctx.clearLog()
    },
    activeNodeId: GolemEncounterStartId,
    nodes: [
      GolemEncounterStart,
      GolemEncounterPreCombat,
      GolemEncounterPostCombat,
    ],
    visitedNodeIds: [],
    values: {
      ruinsPerceptionCheck: 0,
    },
  }
}
