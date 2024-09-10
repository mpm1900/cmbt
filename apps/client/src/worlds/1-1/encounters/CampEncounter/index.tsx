import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { choice } from '@/worlds/_utils'
import { Key01, Potion, Ruby } from '@repo/game/data'
import { Encounter, EncounterNode, Npc } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { IoMdReturnLeft } from 'react-icons/io'
import { LuSwords } from 'react-icons/lu'
import { CampEncounterShop } from './CampEncounterShop'
import { CampEncounterStart, CampEncounterStartId } from './CampEncounterStart'
import { CampEncounterTabs } from './Tabs'

export const CombatTrainingId = nanoid()
const CombatTraining: EncounterNode = {
  id: CombatTrainingId,
  icon: <LuSwords />,
  title: 'Friendly Camp - Combat Training',
  actions: (ctx) => [
    choice({
      label: <IoMdReturnLeft />,
      back: true,
    }),
  ],
  tabs: (ctx) => CampEncounterTabs(ctx),
}

export const ChibleeId = nanoid()
export type ChibleeValues = {
  charmAttempts: number
  costMultiplier: number
}
const chiblee: Npc<ChibleeValues> = {
  id: ChibleeId,
  name: 'Chiblee',
  attr: {
    alive: true,
  },
  items: [Potion(), Potion(), Potion(), Potion(), Potion(), Key01(), Ruby()],
  values: {
    charmAttempts: 0,
    costMultiplier: 1.4,
  },
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
        ctx.addNpc(chiblee)
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
        ctx.log(<Quote name={chiblee.name}>"Welcome back travelers!"</Quote>)
      }
    },
    activeNodeId: CampEncounterStartId,
    nodes: [CampEncounterStart, CampEncounterShop, CombatTraining],
    visitedNodeIds: [],
    values: {},
  }
}
