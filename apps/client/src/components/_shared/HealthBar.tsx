import { Unit } from '@repo/game/types'
import { Bar } from '@shared/Bar'

export type HealthBarProps = {
  unit: Unit
  className?: string
}

export function HealthBar(props: HealthBarProps) {
  const { unit, className } = props
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100

  return <Bar className={className} value={ratio} variant="bg-red-400" />
}
