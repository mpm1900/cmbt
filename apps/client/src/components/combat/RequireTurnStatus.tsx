import { useCombat } from '@/hooks/state'
import { TurnStatus } from '@repo/game/types'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export type RequireTurnStatusProps = PropsWithChildren<{ status: TurnStatus }>

export function RequireTurnStatus(props: RequireTurnStatusProps) {
  const { children, status } = props
  const turn = useCombat((s) => s.turn)
  return turn.status === status ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  ) : null
}
