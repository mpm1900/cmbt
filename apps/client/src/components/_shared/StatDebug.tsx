import { StatKey, Unit } from '@repo/game/types'
import { ReactNode } from 'react'

export type StatDebugProps = {
  stat: StatKey
  unit: Unit
  comp: Unit
  before?: ReactNode
  after?: ReactNode
  map?: (value: number) => number
}

export function StatDebug(props: StatDebugProps) {
  const { stat, unit, comp, before, after, map } = props
  const value = unit.stats[stat]
  const compValue = comp.stats[stat]
  const color =
    value > compValue
      ? 'lightgreen'
      : value < compValue
        ? 'lightcoral'
        : 'inherit'

  return (
    <span style={{ color }} className="font-mono">
      {before}
      {parseFloat((map ? map(value) : value).toFixed(1))}
      {after}
    </span>
  )
}
