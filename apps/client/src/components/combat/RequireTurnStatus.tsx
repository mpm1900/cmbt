import { useCombat } from '@/hooks/state'
import { TurnStatus } from '@repo/game/types'
import { PropsWithChildren } from 'react'

export type RequireTurnStatusProps = PropsWithChildren<{ status: TurnStatus }>

export function RequireTurnStatus(props: RequireTurnStatusProps) {
  const { children, status } = props
  const turn = useCombat((s) => s.turn)
  return turn.status === status ? children : null
}
