import { ActionResult } from '@repo/game/types'
import { create } from 'zustand'

export type ResultsState = {
  queue: ActionResult[]
}

export type ResultsStore = ResultsState & {
  enqueue: (...results: ActionResult[]) => void
  dequeue: () => ActionResult | undefined
}

export const useResults = create<ResultsStore>((set, get) => ({
  queue: [],
  enqueue: (...items) =>
    set((s) => ({
      queue: [...s.queue, ...items],
    })),
  dequeue: () => {
    const [first, ...rest] = get().queue
    set({
      queue: rest,
    })
    return first
  },
}))
