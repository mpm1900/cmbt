import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { LuSwords } from 'react-icons/lu'
import { Chiblee, ChibleeId } from '../../npcs/Chiblee'
import { CampEncounterActions } from './Actions'
import { CampEncounterShop } from './CampEncounterShop'
import { CampEncounterStart, CampEncounterStartId } from './CampEncounterStart'
import { CampEncounterTabs } from './Tabs'

export const CombatTrainingId = nanoid()
const CombatTraining: EncounterNode = {
  id: CombatTrainingId,
  icon: <LuSwords />,
  title: 'Friendly Camp - Combat Training',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),
}

export const CampEncounterId = nanoid()
export const CampEncounter = (): Encounter => {
  return {
    id: CampEncounterId,
    setup: (ctx, props) => {
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
            Your party finds their way to a friendly camp. You see a small group
            of merchants and adventures preparing dinner and settling in for the
            night.
          </Narration>
        )
      } else {
        ctx.log(<Quote name={Chiblee.name}>"Welcome back travelers!"</Quote>)
      }
    },
    activeNodeId: CampEncounterStartId,
    nodes: [CampEncounterStart, CampEncounterShop, CombatTraining],
    visitedNodeIds: [],
    values: {},
  }
}
