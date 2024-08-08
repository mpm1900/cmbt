import { ActiveUnit } from '@/components/combat/ActiveUnit'
import { CleanupSwitchUnits } from '@/components/combat/CleanupSwitchUnits'
import { RequireTurnStatus } from '@/components/combat/RequireTurnStatus'
import { RunningTurn } from '@/components/combat/RunningTurn'
import { Sidebar } from '@/components/combat/Sidebar'
import { Team } from '@/components/combat/Team'
import { Button } from '@/components/ui/button'
import {
  useAiActions,
  useInputController,
  useTurnController,
} from '@/hooks/controllers'
import { useCleanupController } from '@/hooks/controllers/useCleanupController'
import { useActions, useCombat, useCombatSettings } from '@/hooks/state'
import { useCombatSetup } from '@/hooks/useCombatSetup'

export function Combat() {
  const combat = useCombat()
  const queue = useActions()

  useTurnController()
  useInputController()
  useAiActions()
  useCleanupController()
  useCombatSetup()

  const userTeam = combat.teams.find((t) => t.id === combat.user)
  const aiTeam = combat.teams.find((t) => t.id !== combat.user)

  const debug = useCombatSettings()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="flex flex-1 flex-row">
        <div className="w-[64px] h-full bg-slate-950 py-2 flex justify-center">
          <Button
            className="p-1"
            variant={debug.isDebugMode ? 'default' : 'secondary'}
            onClick={() => {
              queue.setQueue(() => [])
              debug.setIsDebugMode(!debug.isDebugMode)
            }}
          >
            Debug
          </Button>
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-auto">
          <div className="flex flex-1 flex-col p-2 justify-between">
            <Team teamId={aiTeam?.id} />
            <div className="flex flex-1 items-center justify-center">
              <RequireTurnStatus status="done">
                <div className="text-lg">battle over!</div>
              </RequireTurnStatus>
              <RequireTurnStatus status="running">
                <RunningTurn />
              </RequireTurnStatus>
              <RequireTurnStatus status="waiting-for-input">
                <ActiveUnit />
              </RequireTurnStatus>
              <RequireTurnStatus status="cleanup">
                <CleanupSwitchUnits />
              </RequireTurnStatus>
              <RequireTurnStatus status="init">
                <CleanupSwitchUnits />
              </RequireTurnStatus>
            </div>
            <Team teamId={userTeam?.id} reverse />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
