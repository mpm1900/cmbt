import { Unit } from '@repo/game/types'
import { useSpring, animated, config } from '@react-spring/web'
import { cn } from '@/lib/utils'

export type HealthBarProps = {
  unit: Unit
  className?: string
}

export function HealthBar(props: HealthBarProps) {
  const { unit, className } = props
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100
  const effect = useSpring({ width: ratio, delay: 500, config: config.slow })
  const value = useSpring({ width: ratio, config: config.stiff })

  return (
    <div
      className={cn(
        'bg-white/20 w-full h-3 relative overflow-hidden',
        className
      )}
      style={{ borderRadius: '8px' }}
    >
      <animated.div
        className="absolute top-0 left-0 h-3 bg-white"
        style={{
          width: effect.width.to((x) => `${x}%`),
        }}
      />
      <animated.div
        className="absolute top-0 left-0 h-3 bg-red-400"
        style={{
          width: value.width.to((x) => `${x}%`),
        }}
      />
    </div>
  )
}
