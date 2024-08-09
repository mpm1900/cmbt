import { AnimationDefinition, motion } from 'framer-motion'
import { ReactNode } from 'react'

export type CombatLogItemProps = {
  node: ReactNode
  delay: number
  onAnimationComplete: (def: AnimationDefinition) => void
}

export function CombatLogItem(props: CombatLogItemProps) {
  const { node, delay, onAnimationComplete } = props
  return (
    <motion.div
      className="px-2 py-0.5 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: delay }}
      onAnimationComplete={onAnimationComplete}
    >
      {node}
    </motion.div>
  )
}
