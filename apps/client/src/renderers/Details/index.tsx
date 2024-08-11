import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { nanoid } from 'nanoid'

export const BurnId = nanoid()

export type DetailsRenderer = {
  name: ReactNode
  description: ReactNode
}

export const DetailsRenderer: Record<Id, DetailsRenderer> = {
  [BurnId]: {
    name: <span className="font-bold text-modifiers-burned">Burn</span>,
    description: (
      <div className="space-y-2">
        <span className="text-modifiers-burned">Burn</span>
        <div className="text-muted-foreground leading-normal">
          A burned unit gains{' '}
          <span className="text-white font-bold">Power Down</span>.
          <br />
          <span className="opacity-50 uppercase text-sm font-bold">
            On turn end:{' '}
          </span>
          Each burned unit takes 10 damage.
        </div>
      </div>
    ),
  },
}
