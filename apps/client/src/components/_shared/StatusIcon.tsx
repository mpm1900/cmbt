import { STATUS_ICONS } from '@/renderers/Status/_icons'
import { Status } from '@repo/game/types'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { StatusHover } from './StatusHover'

export type StatusIconProps = {
  status: Status
  side?: 'top' | 'right' | 'bottom' | 'left'
  fallback: ReactNode
}

export function StatusIcon(props: StatusIconProps) {
  const { status, fallback, side } = props
  const icon = STATUS_ICONS[status.id]
  if (!icon) return fallback

  return (
    <StatusHover side={side} status={status}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[28px] w-[28px] cursor-pointer"
      >
        {icon}
      </motion.div>
    </StatusHover>
  )
}
