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
import { useCombat } from '@/hooks/state'
import { useCombatSetup } from '@/hooks/useCombatSetup'
import { Navbar } from '@shared/Navbar'
import { Link, useNavigate } from '@tanstack/react-router'

export function Combat() {
  const combat = useCombat()

  useTurnController()
  useInputController()
  useAiActions()
  useCleanupController()
  useCombatSetup()

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
                <div>
                  <div className="text-xxl">battle over!</div>
                  <Link to="/world">
                    <Button>Back to World</Button>
                  </Link>
                </div>
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
