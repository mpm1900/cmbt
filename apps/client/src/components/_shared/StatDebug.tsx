import { StatKey, Unit } from '@repo/game/types'

export type StatDebugProps = {
  stat: StatKey
  unit: Unit
  comp: Unit
  map?: (value: number) => number
}

export function StatDebug(props: StatDebugProps) {
  const { stat, unit, comp, map } = props
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
      {parseFloat((map ? map(value) : value).toFixed(1))}
    </span>
  )
}
