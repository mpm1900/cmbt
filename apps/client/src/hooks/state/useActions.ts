import { ActionsQueueItem, GameContext, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { create } from 'zustand'

export type ActionsState = {
  queue: ActionsQueueItem[]
}

export type ActionStore = ActionsState & {
  enqueue: (...items: ActionsQueueItem[]) => void
  dequeue: () => ActionsQueueItem | undefined
  removeWhere: (filter: (item: ActionsQueueItem) => boolean) => void
  setQueue: (setter: (items: ActionsQueueItem[]) => ActionsQueueItem[]) => void
  sort: (ctx: GameContext) => ActionsQueueItem[]
}

export const queueComparator =
  (ctx: GameContext) => (a: ActionsQueueItem, b: ActionsQueueItem) => {
    if (a.action.priority === b.action.priority) {
      const _aSource = ctx.units.find((u) => u.id === a.action.sourceId) as Unit
      const aSource = applyModifiers(_aSource, ctx).unit
      const _bSource = ctx.units.find((u) => u.id === b.action.sourceId) as Unit
      const bSource = applyModifiers(_bSource, ctx).unit

      if (aSource.stats.speed === bSource.stats.speed) {
        return [-1, 1][Math.round(Math.random())]
      }

      return bSource.stats.speed - aSource.stats.speed
    } else {
      return b.action.priority - a.action.priority
    }
  }

const makeQueueHook = () =>
  create<ActionStore>((set, get) => ({
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
    removeWhere: (filter) => {
      set((s) => ({
        queue: s.queue.filter((item) => !filter(item)),
      }))
    },
    setQueue: (setter) => {
      set(({ queue }) => ({
        queue: setter(queue),
      }))
    },
    sort: (ctx: GameContext) => {
      set((s) => ({
        queue: s.queue.sort(queueComparator(ctx)),
      }))
      return get().queue
    },
  }))

export const useActions = makeQueueHook()
export const useCleanup = makeQueueHook()
