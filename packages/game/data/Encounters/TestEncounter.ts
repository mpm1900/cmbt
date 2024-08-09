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
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: TestNode2.id })),
      options: [],
    },
  ],
}

const TestNode2: EncounterNode = {
  id: nanoid(),
  description: 'Are you sure??',
  choices: [
    {
      id: nanoid(),
      label: 'No',
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: TestNode1.id })),
      options: [],
    },
  ],
}

export const TestEncounterId = nanoid()
export const TestEncounter: Encounter = {
  id: TestEncounterId,
  nodes: [TestNode1, TestNode2],
  activeNodeId: TestNode1.id,
}
