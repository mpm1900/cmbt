import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { AnimationDefinition, motion, Transition } from 'framer-motion'
import { CSSProperties } from 'react'

export type BarProps = PropsWithClassname<{
  value: number
  initial?: number
  variant: string
  style?: CSSProperties
  transition?: Partial<Transition>
  onAnimationComplete?: (def: AnimationDefinition) => void
}>

export function Bar(props: BarProps) {
  const {
    className,
    style = {},
    value,
    initial = 0,
    variant,
    transition,
    onAnimationComplete,
  } = props

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
        initial={{ width: `${initial}%` }}
        animate={{ width: `${value}%` }}
        onAnimationComplete={onAnimationComplete}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 80,
          delay: 0.5,
          ...(transition ?? {}),
        }}
      />
      <motion.div
        className={cn('absolute top-0 left-0 h-3', variant)}
        animate={{ width: `${value}%` }}
        initial={{ width: `${initial}%` }}
      />
    </div>
  )
}
