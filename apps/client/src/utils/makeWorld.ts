import { ShopEncounter } from '@/components/encounter/encounters'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { GameWorld } from '@/hooks/state'
import { nanoid } from 'nanoid'

export function makeWorld(): GameWorld {
  return {
    size: {
      x: 2,
      y: 2,
    },
    tiles: [
      {
        id: nanoid(),
        position: { x: 0, y: 0 },
        size: { x: 1, y: 1 },
        encounter: ShopEncounter,
      },
      {
        id: nanoid(),
        position: { x: 0, y: 1 },
        size: { x: 1, y: 1 },
        encounter: TestEncounter,
      },
    ],
  }
}
