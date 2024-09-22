import { useCombat } from '@/hooks/state'
import { TurnStatus } from '@repo/game/types'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export type RequireTurnStatusProps = PropsWithChildren<{
  statuses: TurnStatus[]
}>

export function RequireTurnStatus(props: RequireTurnStatusProps) {
  const { children, statuses } = props
  const turn = useCombat((s) => s.turn)

  return statuses.includes(turn.status) ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.div>
  ) : null
}
