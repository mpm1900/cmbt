import { Unit } from '@repo/game/types'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type HealthBarProps = {
  unit: Unit
  className?: string
}

export function HealthBar(props: HealthBarProps) {
  const { unit, className } = props
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100

  return (
    <div
      className={cn(
        'bg-white/20 w-full h-3 relative overflow-hidden',
        className
      )}
      style={{ borderRadius: '8px' }}
    >
      <motion.div
        className="absolute top-0 left-0 h-3 bg-white"
        animate={{ width: `${ratio}%` }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-0 left-0 h-3 bg-red-400"
        animate={{ width: `${ratio}%` }}
      />
    </div>
  )
}
