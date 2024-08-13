import { ShopEncounter } from '@/components/encounter/encounters'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { GameWorld } from '@/hooks/state'
import { nanoid } from 'nanoid'

export const StartId = nanoid()
export function makeWorld(): GameWorld {
  return {
    activeNodeId: StartId,
    nodes: [
      {
        id: StartId,
        position: { x: -1.1, y: -1 },
        size: 10,
        encounter: {
          id: nanoid(),
          nodes: [],
          activeNodeId: '',
        },
        edges: [ShopEncounter.id + '0'],
        isInteractable: false,
      },
      {
        id: ShopEncounter.id + '0',
        position: { x: -1, y: -1 },
        size: 10,
        encounter: ShopEncounter,
        edges: [TestEncounter.id + '0'],
        isInteractable: true,
      },
      {
        id: TestEncounter.id + '0',
        position: { x: 0, y: 1 },
        size: 10,
        encounter: TestEncounter,
        edges: [ShopEncounter.id + '0'],
        isInteractable: true,
      },
    ],
  }
}
