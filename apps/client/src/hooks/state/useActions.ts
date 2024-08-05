import { ActionsQueueItem, CombatContext, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { create } from 'zustand'

export type ActionsState = {
  queue: ActionsQueueItem[]
}

export type ActionStore = ActionsState & {
  enqueue: (...items: ActionsQueueItem[]) => void
  dequeue: () => ActionsQueueItem | undefined
  removeWhere: (filter: (item: ActionsQueueItem) => boolean) => void
  setQueue: (
    setter: (items: ActionsQueueItem[]) => ActionsQueueItem[]
  ) => ActionStore
  sort: (ctx: CombatContext) => ActionsQueueItem[]
}

export const queueComparator =
  (ctx: CombatContext) => (a: ActionsQueueItem, b: ActionsQueueItem) => {
    if (a.action.priority === b.action.priority) {
      const _aSource = ctx.units.find((u) => u.id === a.action.sourceId)
      const aSource = _aSource ? applyModifiers(_aSource, ctx).unit : _aSource
      const _bSource = ctx.units.find((u) => u.id === b.action.sourceId)
      const bSource = _bSource ? applyModifiers(_bSource, ctx).unit : _bSource

      if (!aSource && !bSource) return 0
      if (!aSource) return -1
      if (!bSource) return 1

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
      return get()
    },
    sort: (ctx: CombatContext) => {
      set((s) => ({
        queue: s.queue.sort(queueComparator(ctx)),
      }))
      return get().queue
    },
  }))

export const useActions = makeQueueHook()
export const useCleanup = makeQueueHook()
