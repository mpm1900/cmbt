import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { StatKey, Unit } from '@repo/game/types'
import { ReactNode } from 'react'

export type StatDebugProps = PropsWithClassname<{
  stat: StatKey
  unit: Unit
  comp: Unit
  before?: ReactNode
  after?: ReactNode
  map?: (value: number) => number
}>

export function StatValue(props: StatDebugProps) {
  const { stat, unit, comp, className, before, after, map } = props
  const value = unit.stats[stat]
  const compValue = comp.stats[stat]
  const color =
    value > compValue
      ? 'lightgreen'
      : value < compValue
        ? 'lightcoral'
        : 'inherit'

  return (
    <span className={cn('num', className)} style={{ color }}>
      {before}
      {parseFloat((map ? map(value) : value).toFixed(1))}
      {after}
    </span>
  )
}
