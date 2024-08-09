import { nanoid } from 'nanoid'
import { Encounter, EncounterNode } from '../../types'

const TestNode1: EncounterNode = {
  id: nanoid(),
  description: 'Begin Combat?',
  choices: [
    {
      id: nanoid(),
      label: 'Yes',
      resolve: (ctx) => {
        ctx.initializeCombat()
      },
      options: [
        {
          id: nanoid(),
          label: 'Begin',
          resolve: (ctx) => {
            ctx.initializeCombat()
          },
        },
      ],
    },
    {
      id: nanoid(),
      label: 'No',
      options: [],
    },
  ],
}

export const TestEncounterId = nanoid()
export const TestEncounter: Encounter = {
  id: TestEncounterId,
  nodes: [TestNode1],
  activeNodeId: TestNode1.id,
}
