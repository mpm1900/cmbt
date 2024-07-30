import { ActionResult } from '@repo/game/types'
import { create } from 'zustand'

export type TurnStatus =
  | 'init'
  | 'waiting-for-input'
  | 'running'
  | 'cleanup'
  | 'done'
export type Turn = {
  count: number
  status: TurnStatus
  results: (ActionResult | undefined)[]
}

export type TurnState = {
  turn: Turn
}

export type TurnStore = TurnState & {
  next: () => void
  setStatus: (status: TurnStatus) => void
  setTurn: (fn: (turn: Turn) => Partial<Turn>) => void
  pushResult: (result: ActionResult | undefined) => void
}

export const useTurn = create<TurnStore>((set) => ({
  turn: {
    count: 0,
    status: 'init',
    results: [],
  },
  next: () =>
    set((s) => ({ turn: { ...s.turn, count: s.turn.count + 1, results: [] } })),
  setStatus: (status) => set((s) => ({ turn: { ...s.turn, status } })),
  setTurn: (fn) =>
    set((s) => ({
      turn: {
        ...s.turn,
        ...fn(s.turn),
      },
    })),
  pushResult: (result) =>
    set((s) => ({
      turn: {
        ...s.turn,
        results: [...s.turn.results, result],
      },
    })),
}))
