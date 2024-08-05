import { useGameActions, useGameContext } from '../hooks'
import { nanoid } from 'nanoid/non-secure'
import { GetUnits, SetIsActive } from '@repo/game/data'
import { SwitchUnits } from './SwitchUnits'
import { useState } from 'react'
import { Unit } from '@repo/game/types'
import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'

export type CleanupSwitchUnitsProps = {
  teamId: string
}

export function CleanupSwitchUnits(props: CleanupSwitchUnitsProps) {
  const { teamId } = props
  const ctx = useGameContext()
  const fns = useGameActions()
  const aliveActiveUnits = new GetUnits({
    teamId: ctx.user,
    isActive: true,
    isAlive: true,
  }).resolve(ctx)
  const selectCount = MAX_ACTIVE_UNITS_COUNT - aliveActiveUnits.length

  return (
    <div className="w-[580px]">
      <SwitchUnits
        action={new SetIsActive('', teamId, selectCount)}
        onConfirm={(selectedTargets) => {
          fns.pushCleanupAction({
            id: nanoid(),
            action: new SetIsActive('', teamId),
            targetIds: selectedTargets.map((u) => u.id),
          })
        }}
      />
    </div>
  )
}
