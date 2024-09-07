import { makeBuilder } from '@/utils/makeUnitBuilder'
import { Id, UnitBuilder } from '@repo/game/types'
import { create } from 'zustand'

export type UnitBuildersState = {
  builders: UnitBuilder[]
}
export type UnitBuildersStore = UnitBuildersState & {
  addBuilder: (builder: UnitBuilder) => void
  updateBuilder: (
    id: Id | undefined,
    fn: (builder: UnitBuilder) => Partial<UnitBuilder>
  ) => void
}

export const useUnitBuilders = create<UnitBuildersStore>((set) => ({
  builders: [makeBuilder(0), makeBuilder(1), makeBuilder(2), makeBuilder(3)],
  addBuilder: (builder) =>
    set((s) => ({ builders: s.builders.concat(builder) })),
  updateBuilder: (id, fn) =>
    set((s) => ({
      builders: s.builders.map((b) => (b.id === id ? { ...b, ...fn(b) } : b)),
    })),
}))
