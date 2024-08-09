import { routeTransitionProps } from '@/constants'
import { Combat } from '@/domain'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/combat')({
  component: () => (
    <div className="flex-1 bg-slate-950">
      <motion.div className="flex-1" {...routeTransitionProps}>
        <Combat />
      </motion.div>
    </div>
  ),
})
