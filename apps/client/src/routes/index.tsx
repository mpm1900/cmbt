import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Builder } from '@/domain'
import { routeTransitionProps } from '@/constants'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="flex-1 bg-black">
      <motion.div className="flex-1" {...routeTransitionProps}>
        <Builder />
      </motion.div>
    </div>
  ),
})
