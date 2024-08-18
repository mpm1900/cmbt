import { cn } from '@/lib/utils'
import { Unit } from '@repo/game/types'
import { Bar } from '@shared/Bar'
import { HealthBar } from './HealthBar'

function getRatios(x: number, y: number, z: number): [number, number, number] {
  const sum = x + y + z
  return [x / sum, y / sum, z / sum].map((v) => v * 100) as [
    number,
    number,
    number,
  ]
}

export type UnitBarsProps = {
  unit: Unit
  isActive: boolean
  hideStats: boolean
  initial?: number
}

export function UnitBars(props: UnitBarsProps) {
  const { hideStats, initial, isActive, unit } = props
  const ratios = getRatios(
    unit.stats.focus,
    unit.stats.stamina,
    unit.stats.devotion
  )
  return (
    <div className="space-y-1">
      <HealthBar
        unit={unit}
        className={cn({
          'bg-black/20': isActive,
        })}
        initial={initial}
      />
      {!hideStats && (
        <>
          <div className="flex space-x-1">
            {unit.stats.focus > 0 && (
              <Bar
                value={
                  (Math.max(unit.values.focus, 0) / unit.stats.focus) * 100
                }
                className="h-1"
                variant="bg-blue-400"
                style={{ width: `${ratios[0]}%` }}
                initial={initial}
              />
            )}
            {unit.stats.stamina > 0 && (
              <Bar
                value={
                  (Math.max(unit.values.stamina, 0) / unit.stats.stamina) * 100
                }
                className="h-1"
                variant={cn({
                  'bg-green-300': !isActive,
                  'bg-green-600': isActive,
                })}
                style={{ width: `${ratios[1]}%` }}
                initial={initial}
              />
            )}
            {unit.stats.devotion > 0 && (
              <Bar
                value={
                  (Math.max(unit.values.devotion, 0) / unit.stats.devotion) *
                  100
                }
                className="h-1"
                variant={cn({
                  'bg-white': !isActive,
                  'bg-slate-950': isActive,
                })}
                style={{ width: `${ratios[2]}%` }}
                initial={initial}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
