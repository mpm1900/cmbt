import { Unit } from '@repo/game/types'
import { useSpring, animated } from '@react-spring/web'

export type HealthBarProps = {
  unit: Unit
}

export function HealthBar(props: HealthBarProps) {
  const { unit } = props
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100
  const spring = useSpring({ width: ratio, delay: 500 })

  return (
    <div
      className="bg-white/20 w-full h-3 relative overflow-hidden"
      style={{ borderRadius: '8px' }}
    >
      <animated.div
        className="absolute top-0 left-0 h-3 bg-white"
        style={{
          width: spring.width.to((x) => `${x}%`),
        }}
      />
      <div
        className="absolute top-0 left-0 h-3 bg-red-400"
        style={{ width: `${ratio}%` }}
      />
    </div>
  )
}
