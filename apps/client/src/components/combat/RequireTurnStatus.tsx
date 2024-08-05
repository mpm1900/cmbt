import { PropsWithChildren } from 'react'
import { TurnStatus, useTurn } from '../../hooks/state/useTurn'

export type RequireTurnStatusProps = PropsWithChildren<{ status: TurnStatus }>

export function RequireTurnStatus(props: RequireTurnStatusProps) {
  const { children, status } = props
  const turn = useTurn((s) => s.turn)
  return turn.status === status ? children : null
}
