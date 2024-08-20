import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

const TestNode1: EncounterNode = {
  id: nanoid(),
  title: 'Test Encounter 001',
  text: 'Begin Combat?',
  choices: () => [
    {
      id: nanoid(),
      label: 'Yes',
      resolve: (ctx) => {
        ctx.initializeCombat({
          enemyUnitCount: 2,
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
          },
          onFailure: () => {},
        })
      },
      options: [],
    },
    {
      id: nanoid(),
      label: 'No',
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: TestNode2.id })),
      options: [],
    },
    {
      id: nanoid(),
      label: 'Leave',
      resolve: (ctx) => ctx.back(),
      options: [],
    },
    {
      id: nanoid(),
      label: 'Complete',
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
        }))
        ctx.back()
      },
    },
  ],
}

const TestNode2: EncounterNode = {
  id: nanoid(),
  title: 'Test Encounter 001',
  text: 'Are you sure??',
  choices: () => [
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
  values: {},
}
