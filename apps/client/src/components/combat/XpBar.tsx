import { Unit } from '@repo/game/types'
import {
  getExperience,
  getExperienceToNextLevel,
  getLevel,
} from '@repo/game/utils'
import { Bar } from '@shared/Bar'
import { useEffect, useState } from 'react'

export type XpBarProps = {
  unit: Unit
  xp: number
}

export function XpBar(props: XpBarProps) {
  const { unit } = props
  const [unitXp, setUnitXp] = useState(unit.xp)
  const [xp, setXp] = useState(props.xp)
  const [level, setLevel] = useState(unit.level)
  const unitLevelXp = getExperience(level)
  const totalUnitXp = unitLevelXp + unitXp
  const xpToNext = getExperienceToNextLevel(level)
  const neededToLevel = xpToNext - unitXp
  const computedLevel = getLevel(totalUnitXp + xp + unitXp)
  const flooredLevel = Math.floor(computedLevel)
  const [ratio, setRatio] = useState(Math.min((xp + unitXp) / xpToNext, 1))

  useEffect(() => {
    if (ratio === 0) {
      setRatio(Math.min((xp + unitXp) / xpToNext, 1))
    }
  }, [ratio])

  return (
    <div className="flex items-center space-x-2">
      <div>{level}</div>
      <div className="h-[12px] flex-1">
        {ratio !== 0 && (
          <Bar
            variant=""
            initial={(unitXp / xpToNext) * 100}
            value={ratio * 100}
            transition={{
              delay: 0,
              stiffness: 160,
            }}
            onAnimationComplete={(deps: any) => {
              if (
                flooredLevel > level &&
                deps.width === '100%' &&
                ratio !== 0
              ) {
                setLevel(level + 1)
                setXp(xp - neededToLevel)
                setUnitXp(0)
                setRatio(0)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
