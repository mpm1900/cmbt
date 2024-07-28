import { create } from 'zustand'

export type Store = {
  value: number
  inc: () => number
}

export const useTestStore = create<Store>((set, get) => ({
  value: 0,
  inc: () => {
    set((s) => ({
      value: s.value + 1,
    }))
    return get().value
  },
}))
