import { routeTransitionProps } from '@/constants'
import { Encounter } from '@/domain/Encounter'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/encounter')({
  component: () => (
    <div className="flex-1 bg-slate-950">
      <motion.div className="flex-1" {...routeTransitionProps}>
        <Encounter />
      </motion.div>
    </div>
  ),
})
