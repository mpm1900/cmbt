import { Key01, Potion, Ruby } from '@repo/game/data'
import { Npc } from '@repo/game/types'
import { nanoid } from 'nanoid'

export const ChibleeId = nanoid()
export type ChibleeValues = {
  charmAttempts: number
  costMultiplier: number
}
export const Chiblee: Npc<ChibleeValues> = {
  id: ChibleeId,
  name: 'Chiblee',
  attr: {
    alive: true,
  },
  items: [Potion(), Potion(), Potion(), Potion(), Potion(), Key01(), Ruby()],
  resources: {
    credits: 1555,
  },
  values: {
    charmAttempts: 0,
    costMultiplier: 1.4,
  },
}
