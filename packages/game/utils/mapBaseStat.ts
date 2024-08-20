import { StatKey } from '../types'

export function mapBaseStat(key: StatKey, base: number, level: number): number {
  const value = (base * level) / 50
  if (key === 'health') return Math.round(value + level)
  return Math.round(value)
}
