import { ItemRarity } from '@repo/game/types'

export type ItemRarityRenderer = {
  bg: string
  color: string
}

export const ItemRarityRenderers: Record<ItemRarity, ItemRarityRenderer> = {
  common: {
    bg: '#020617',
    color: 'white',
  },
  uncommon: {
    bg: '#03170a',
    color: '#86efac',
  },
  rare: {
    bg: '#010c19',
    color: '#93c5fd',
  },
  legendary: {
    bg: '#0c0119',
    color: '#c084fc',
  },
  unique: {
    bg: '#181001',
    color: '#f59e0b',
  },
}
