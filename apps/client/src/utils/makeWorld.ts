import { ShopEncounter } from '@/components/encounter/encounters'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { GameWorld } from '@/hooks/state'
import { nanoid } from 'nanoid'

export const StartId = nanoid()
export function makeWorld(): GameWorld {
  return {
    activeNodeId: StartId,
    visitiedNodeIds: [],
    nodes: [
      {
        id: StartId,
        size: 20,
        icon: 'start',
        encounter: {
          id: nanoid(),
          nodes: [],
          activeNodeId: '',
        },
        edges: [ShopEncounter.id + '0'],
        isInteractable: false,
        repeats: false,
      },
      {
        id: ShopEncounter.id + '0',
        size: 20,
        icon: 'shop',
        encounter: ShopEncounter,
        edges: [TestEncounter.id + '0', TestEncounter.id + '1'],
        isInteractable: true,
        repeats: false,
      },
      {
        id: TestEncounter.id + '0',
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [ShopEncounter.id + '0'],
        isInteractable: true,
        repeats: false,
      },
      {
        id: TestEncounter.id + '1',
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [TestEncounter.id + '2', TestEncounter.id + '4'],
        isInteractable: true,
        repeats: true,
      },
      {
        id: TestEncounter.id + '4',
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [],
        isInteractable: true,
        repeats: false,
      },
      {
        id: TestEncounter.id + '2',
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [
          ShopEncounter.id + '0',
          TestEncounter.id + '1',
          ShopEncounter.id + '1',
        ],
        isInteractable: true,
        repeats: false,
      },
      {
        id: ShopEncounter.id + '1',
        size: 20,
        icon: 'shop',
        encounter: ShopEncounter,
        edges: [TestEncounter.id + '0', TestEncounter.id + '3'],
        isInteractable: true,
        repeats: false,
      },
      {
        id: TestEncounter.id + '3',
        size: 20,
        icon: 'combat',
        encounter: TestEncounter,
        edges: [],
        isInteractable: true,
        repeats: false,
      },
    ],
  }
}
