import { Key01Id } from '@repo/game/data'
import { Encounter, EncounterChoice, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

const LockedNodeId = nanoid()
const LockedNode1 = (): EncounterNode => {
  return {
    id: LockedNodeId,
    title: 'Locked Door',
    text: 'The door before you is locked.',
    choices: (ctx) => {
      const options: EncounterChoice[] = [
        {
          id: nanoid(),
          label: 'Leave.',
          resolve: (ctx) => ctx.back(),
        },
      ]

      if (ctx.team?.items.find((i) => i.id === Key01Id)) {
        return [
          {
            id: LockedNodeId,
            label: 'Unlock the door.',
            resolve: (ctx) => {
              ctx.updateActiveWorldNode((n) => ({
                locked: false,
                completed: true,
              }))
              ctx.back()
            },
          },
          ...options,
        ]
      }

      return options
    },
  }
}

export const LockedEncounterId = nanoid()
export const LockedEncounter: Encounter = {
  id: LockedEncounterId,
  nodes: [LockedNode1()],
  activeNodeId: LockedNodeId,
  values: {},
}
