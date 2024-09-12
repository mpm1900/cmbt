import { ActionsQueueItem, CombatContext } from '@repo/game/types'
import { applyModifiers, getPriority } from '@repo/game/utils'
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

export const queueComparator =
  (ctx: CombatContext) => (a: ActionsQueueItem, b: ActionsQueueItem) => {
    const _aSource = ctx.units.find((u) => u.id === a.action.sourceId)
    const aSource = _aSource ? applyModifiers(_aSource, ctx).unit : _aSource
    const _bSource = ctx.units.find((u) => u.id === b.action.sourceId)
    const bSource = _bSource ? applyModifiers(_bSource, ctx).unit : _bSource

    const aPriority = getPriority(a.action, aSource)
    const bPriority = getPriority(b.action, bSource)

    if (aPriority === bPriority) {
      if (!aSource && !bSource) return 0
      if (!aSource) return -1
      if (!bSource) return 1

      if (aSource.stats.speed === bSource.stats.speed) {
        return aSource.id.localeCompare(bSource.id)
      }

      return bSource.stats.speed - aSource.stats.speed
    } else {
      return bPriority - aPriority
    }
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
