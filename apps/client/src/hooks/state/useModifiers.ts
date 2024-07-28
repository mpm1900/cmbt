import { Modifier, Id } from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'
import { create } from 'zustand'

type ModifiersState = {
  modifiers: Modifier[]
}

type ModifiersStore = ModifiersState & {
  add(modifiers: Modifier[]): Modifier[]
  remove(...ids: Id[]): Modifier[]
  removeWhere(filter: (modifier: Modifier) => boolean): Modifier[]
  setModifiers: (setter: (modifiers: Modifier[]) => Modifier[]) => Modifier[]
  removeZeroDurations(): Modifier[]
  decrementDurations(): Modifier[]
}

export const useModifiers = create<ModifiersStore>((set, get) => ({
  modifiers: [],
  add(modifiers) {
    set((state) => ({
      modifiers: validateModifiers(modifiers, state.modifiers),
    }))
    return get().modifiers
  },
  remove(...rtids) {
    set(({ modifiers }) => ({
      modifiers: modifiers.filter((modifier) => !rtids.includes(modifier.rtid)),
    }))
    return get().modifiers
  },
  removeWhere(clause) {
    set(({ modifiers }) => ({
      modifiers: modifiers.filter((m) => !clause(m)),
    }))
    return get().modifiers
  },
  setModifiers(setter) {
    set(({ modifiers }) => ({
      modifiers: setter(modifiers),
    }))
    return get().modifiers
  },
  removeZeroDurations() {
    set(({ modifiers }) => ({
      modifiers: modifiers.filter((modifier) => modifier.duration !== 0),
    }))
    return get().modifiers
  },
  decrementDurations() {
    set(({ modifiers }) => ({
      modifiers: modifiers.map((modifier) => modifier.decrementDuration()),
    }))
    return get().modifiers
  },
}))
