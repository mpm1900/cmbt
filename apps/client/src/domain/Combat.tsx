import { ActiveUnit } from '@/components/combat/ActiveUnit'
import { CleanupSwitchUnits } from '@/components/combat/CleanupSwitchUnits'
import { RequireTurnStatus } from '@/components/combat/RequireTurnStatus'
import { RunningTurn } from '@/components/combat/RunningTurn'
import { Sidebar } from '@/components/combat/Sidebar'
import { Team } from '@/components/combat/Team'
import {
  useAiActions,
  useInputController,
  useTurnController,
} from '@/hooks/controllers'
import { useCleanupController } from '@/hooks/controllers/useCleanupController'
import { useCombat } from '@/hooks/state'
import { useCombatSetup } from '@/hooks/useCombatSetup'
import { Navbar } from '@shared/Navbar'

export function Combat() {
  const combat = useCombat()

  useTurnController()
  useInputController()
  useAiActions()
  useCleanupController()
  useCombatSetup()

  console.log(combat.units.map((u) => u.registry.modifiers))

  const userTeam = combat.teams.find((t) => t.id === combat.user)
  const aiTeam = combat.teams.find((t) => t.id !== combat.user)

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <Navbar />
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
