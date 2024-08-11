import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { nanoid } from 'nanoid'

export const BurnId = nanoid()
export const InspectedId = nanoid()

export type DetailsRenderer = {
  name: ReactNode
  description: ReactNode
}

export const DetailsRenderer: Record<Id, DetailsRenderer> = {
  [BurnId]: {
    name: <span className="font-bold text-modifiers-burned">Burn</span>,
    description: (
      <div className="space-y-1">
        <span className="font-bold text-modifiers-burned">Burn</span>
        <div className="text-muted-foreground">
          A burned unit's physical stat is halved. At the end of each turn, a
          burned unit takes 10 damage.
        </div>
      </div>
    ),
  },
  [InspectedId]: {
    name: <span className="font-bold text-white">Inspected</span>,
    description: (
      <div className="space-y-1">
        <span className="font-bold text-white">Inspected</span>
        <div className="text-muted-foreground">
          An inspected unit's stats are visible.
        </div>
      </div>
    ),
  },
}
