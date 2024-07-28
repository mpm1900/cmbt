import { Item } from '@repo/game/types'
import { create } from 'zustand'

export type ItemsState = {
  items: Item[]
}
export type ItemsStore = ItemsState & {
  addItems: (...items: Item[]) => void
  decrementWhere: (fn: (item: Item) => boolean) => void
}

export const useItems = create<ItemsStore>((set) => ({
  items: [],
  addItems: (...items) => set((s) => ({ items: [...s.items, ...items] })),
  decrementWhere: (fn) =>
    set((s) => ({
      items: s.items.map((i) => (fn(i) ? i.decrementCount() : i)),
    })),
}))
