import { useCleanup, useCombat } from '@/hooks/state'
import { getTeamsWithSelectionRequired } from '@/utils'
import { GetUnits, SetIsActive } from '@repo/game/data'
import { nanoid } from 'nanoid/non-secure'
import { LuSwords } from 'react-icons/lu'
import { useCombatContext } from '../../hooks'
import { SwitchUnits } from './SwitchUnits'

export type CleanupSwitchUnitsProps = {}

export function CleanupSwitchUnits(props: CleanupSwitchUnitsProps) {
  const combat = useCombat()
  const ctx = useCombatContext()
  const cleanup = useCleanup()
  const aliveActiveUnits = new GetUnits({
    teamId: ctx.user,
    isActive: true,
    isAlive: true,
  }).resolve(ctx)
  const team = getTeamsWithSelectionRequired(combat.teams, ctx).find(
    (team) => team.id === ctx.user
  )
  const selectCount = (team?.maxActiveUnits ?? 0) - aliveActiveUnits.length

  return (
    <div className="w-[580px]">
      {combat.turn.count === 0 && (
        <div className="p-5 mb-8 space-y-2 flex flex-col items-center">
          <LuSwords className="h-[64px] w-[64px]" />
          <div className="text-5xl font-black">Combat Start!</div>
        </div>
      )}
      {team && (
        <SwitchUnits
          action={new SetIsActive(team.id, selectCount)}
          onConfirm={(selectedTargets) => {
            cleanup.enqueue({
              id: nanoid(),
              action: new SetIsActive(team.id, selectCount),
              targetIds: selectedTargets.map((u) => u.id),
            })
          }}
        />
      )}
    </div>
  )
}
