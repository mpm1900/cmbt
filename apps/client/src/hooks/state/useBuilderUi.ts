import { Id } from '@repo/game/types'
import { create } from 'zustand'

export type BuilderUiState = {
  activeBuilderId: Id | undefined
}

export type BuilderUiStore = BuilderUiState & {
  setActiveBuilderId: (activeBuilder: Id | undefined) => void
}

export const useBuilderUi = create<BuilderUiStore>((set) => ({
  activeBuilderId: undefined,
  setActiveBuilderId: (activeBuilderId) => set({ activeBuilderId }),
}))
