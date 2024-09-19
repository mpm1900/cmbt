import { Cleric } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from 'react'

export type UnitBaseRenderer = {
  description: () => ReactNode
}

export const UnitBaseRenderers: { [key: Id]: UnitBaseRenderer } = {
  [Cleric.id]: {
    description: () => <>A cleric an hybrid healer and damage support.</>,
  },
}
