import { ShopEncounter } from '@/components/encounter/encounters'
import { GameWorld } from '@/hooks/state'
import { nanoid } from 'nanoid'

export function makeWorld(): GameWorld {
  return {
    size: {
      x: 1,
      y: 1,
    },
    tiles: [
      {
        id: nanoid(),
        location: { x: 0, y: 0 },
        size: { x: 1, y: 1 },
        encounter: ShopEncounter,
      },
    ],
  }
}
