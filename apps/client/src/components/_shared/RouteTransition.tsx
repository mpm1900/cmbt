import { routeTransitionProps } from '@/constants'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export function RouteTransition(props: PropsWithChildren) {
  return (
    <div className="flex flex-1 bg-slate-950">
      <motion.div className="flex-1" {...routeTransitionProps}>
        {props.children}
      </motion.div>
    </div>
  )
}
