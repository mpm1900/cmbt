import { StatKey, Unit } from '@repo/game/types'

export type StatDebugProps = {
  stat: StatKey
  unit: Unit
  comp: Unit
}

export function StatDebug(props: StatDebugProps) {
  const { stat, unit, comp } = props
  const value = unit.stats[stat]
  const compValue = comp.stats[stat]
  const color =
    value > compValue
      ? 'lightgreen'
      : value < compValue
        ? 'lightcoral'
        : 'inherit'

  return <span style={{ color }}>{parseFloat(value.toFixed(1))}</span>
}
