import { create } from 'zustand'

export type TurnStatus = 'init' | 'idle' | 'running' | 'cleanup' | 'done'
export type Turn = {
  count: number
  status: TurnStatus
}

export type TurnState = {
  turn: Turn
}

export type TurnStore = TurnState & {
  next: () => void
  setStatus: (status: TurnStatus) => void
  setTurn: (fn: (turn: Turn) => Partial<Turn>) => void
}

export const useTurn = create<TurnStore>((set) => ({
  turn: {
    count: 0,
    status: 'init',
  },
  next: () => set((s) => ({ turn: { ...s.turn, count: s.turn.count + 1 } })),
  setStatus: (status) => set((s) => ({ turn: { ...s.turn, status } })),
  setTurn: (fn) =>
    set((s) => ({
      turn: {
        ...s.turn,
        ...fn(s.turn),
      },
    })),
}))
