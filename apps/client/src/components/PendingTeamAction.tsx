import { useGameActions } from '../hooks'
import { nanoid } from 'nanoid/non-secure'
import { SetIsActive } from '@repo/game/data'
import { SwitchUnits } from './SwitchUnits'

export type PendingTeamActionProps = {
  teamId: string
}

export function PendingTeamAction(props: PendingTeamActionProps) {
  const { teamId } = props
  const fns = useGameActions()

  return (
    <div className="w-[580px]">
      <SwitchUnits
        action={new SetIsActive('', teamId)}
        onClick={(action, unit) => {
          action.sourceId = unit.id
          fns.pushCleanupAction({
            id: nanoid(),
            action,
            targetIds: [unit.id],
          })
        }}
      />
    </div>
  )
}
