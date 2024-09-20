import { StatKey } from '../types'

export function getBaseStatValue(
  key: StatKey,
  base: number,
  _level: number
): number {
  const level = _level * 5
  const value = (base * level) / 50
  if (key === 'health') return Math.round(value + level)
  return Math.round(value)
}
