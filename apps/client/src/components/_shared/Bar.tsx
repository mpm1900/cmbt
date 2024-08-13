import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

export type BarProps = PropsWithClassname<{
  value: number
  variant: string
  style?: CSSProperties
}>

export function Bar(props: BarProps) {
  const { className, style = {}, value, variant } = props

  return (
    <div
      className={cn(
        'bg-white/20 w-full h-3 relative overflow-hidden',
        className
      )}
      style={{ borderRadius: '4px', ...style }}
    >
      <motion.div
        className="absolute top-0 left-0 h-3 bg-white/70"
        animate={{ width: `${value}%` }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 80,
          delay: 0.5,
        }}
      />
      <motion.div
        className={cn('absolute top-0 left-0 h-3', variant)}
        animate={{ width: `${value}%` }}
      />
    </div>
  )
}
