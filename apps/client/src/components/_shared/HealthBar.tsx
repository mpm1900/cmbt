import { PropsWithClassname } from '@/types'
import { Unit } from '@repo/game/types'
import { Bar } from '@shared/Bar'

export type HealthBarProps = PropsWithClassname<{
  unit: Unit
  initial?: number
}>

export function HealthBar(props: HealthBarProps) {
  const { unit, initial, className } = props
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100

  return (
    <Bar
      className={className}
      value={ratio}
      initial={initial}
      variant="bg-red-400"
    />
  )
}
