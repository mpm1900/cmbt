import { queueComparator } from '@/utils'
import { ActionsQueueItem, CombatContext } from '@repo/game/types'
import { create } from 'zustand'

export type ActionsState = {
  queue: ActionsQueueItem[]
}

export type ActionStore = ActionsState & {
  enqueue: (...items: ActionsQueueItem[]) => void
  dequeue: (ctx: CombatContext) => ActionsQueueItem | undefined
  remove: (filter: (item: ActionsQueueItem) => boolean) => void
  setQueue: (
    setter: (items: ActionsQueueItem[]) => ActionsQueueItem[]
  ) => ActionStore
  first: (ctx: CombatContext) => ActionsQueueItem | undefined
}

const makeQueueHook = () =>
  create<ActionStore>((set, get) => ({
    queue: [],
    enqueue: (...items) =>
      set((s) => ({
        queue: [...s.queue, ...items],
      })),
    dequeue: (ctx) => {
      const [first, ...rest] = get().queue.sort(queueComparator(ctx))
      set({
        queue: rest,
      })
      return first
    },
    remove: (filter) => {
      set((s) => ({
        queue: s.queue.filter((item) => !filter(item)),
      }))
    },
    setQueue: (setter) => {
      set(({ queue }) => ({
        queue: setter(queue),
      }))
      return get()
    },
    first: (ctx) => {
      const { queue } = get()
      const first = queue.sort(queueComparator(ctx))[0]
      return first
    },
  }))

export const useActions = makeQueueHook()
export const useCleanup = makeQueueHook()
