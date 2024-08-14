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
        x: -1.1,
        y: -1,
        size: 20,
        icon: 'start',
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
        x: -1,
        y: -1,
        size: 20,
        icon: 'shop',
        encounter: ShopEncounter,
        edges: [TestEncounter.id + '0', TestEncounter.id + '1'],
        isInteractable: true,
      },
      {
        id: TestEncounter.id + '0',
        x: 0,
        y: 1,
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [ShopEncounter.id + '0'],
        isInteractable: true,
      },
      {
        id: TestEncounter.id + '1',
        x: 1,
        y: 1,
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [TestEncounter.id + '2'],
        isInteractable: true,
      },
      {
        id: TestEncounter.id + '2',
        x: 1,
        y: 1,
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [ShopEncounter.id + '0', TestEncounter.id + '1'],
        isInteractable: true,
      },
    ],
  }
}
