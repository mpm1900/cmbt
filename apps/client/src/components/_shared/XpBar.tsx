import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { Unit } from '@repo/game/types'
import { getExperienceToNextLevel } from '@repo/game/utils'
import { Bar } from './Bar'

export type XpBarProps = PropsWithClassname<{
  unit: Unit
}>

export function XpBar(props: XpBarProps) {
  const { unit, className } = props
  const value = unit.xp / getExperienceToNextLevel(unit.level)

  return (
    <Bar
      variant="bg-white/40"
      className={cn(className)}
      initial={value * 100}
      value={value * 100}
    />
  )
}
