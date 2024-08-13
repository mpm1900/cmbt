import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'
import { getTeamsWithSelectionRequired } from '@/utils'
import { GetUnits, SetIsActive } from '@repo/game/data'
import { nanoid } from 'nanoid/non-secure'
import { useCombatActions, useCombatContext } from '../../hooks'
import { SwitchUnits } from './SwitchUnits'

export type CleanupSwitchUnitsProps = {}

export function CleanupSwitchUnits(props: CleanupSwitchUnitsProps) {
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const aliveActiveUnits = new GetUnits({
    teamId: ctx.user,
    isActive: true,
    isAlive: true,
  }).resolve(ctx)
  const selectCount = MAX_ACTIVE_UNITS_COUNT - aliveActiveUnits.length
  const team = getTeamsWithSelectionRequired(ctx).find(
    (team) => team.id === ctx.user
  )

  return (
    <div className="w-[580px]">
      {ctx.turn.count === 0 && (
        <div className="p-5">
          <div className="text-center text-6xl font-black">Combat Start!</div>
        </div>
      )}
      {team && (
        <SwitchUnits
          action={new SetIsActive('', team.id, selectCount)}
          onConfirm={(selectedTargets) => {
            fns.pushCleanupAction({
              id: nanoid(),
              action: new SetIsActive('', team.id),
              targetIds: selectedTargets.map((u) => u.id),
            })
          }}
        />
      )}
    </div>
  )
}
