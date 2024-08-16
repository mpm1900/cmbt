import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

const LockedNode1: EncounterNode = {
  id: nanoid(),
  title: 'This encounter is locked',
  description: 'Unlock?',
  choices: () => [
    {
      id: nanoid(),
      label: 'Yes',
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          locked: false,
          completed: true,
          icon: 'unlocked',
        }))
        ctx.back()
      },
      options: [],
    },
    {
      id: nanoid(),
      label: 'No',
      resolve: (ctx) => ctx.back(),
      options: [],
    },
  ],
}

export const LockedEncounterId = nanoid()
export const LockedEncounter: Encounter = {
  id: LockedEncounterId,
  nodes: [LockedNode1],
  activeNodeId: LockedNode1.id,
}
