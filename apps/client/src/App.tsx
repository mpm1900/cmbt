import {
  useAiActions,
  useInputController,
  useTurnController,
} from '@/hooks/controllers'
import { ActiveUnit } from './components/combat/ActiveUnit'
import { CleanupSwitchUnits } from './components/combat/CleanupSwitchUnits'
import { RequireTurnStatus } from './components/combat/RequireTurnStatus'
import { RunningTurn } from './components/combat/RunningTurn'
import { useCleanupController } from './hooks/controllers/useCleanupController'
import { Sidebar } from './components/combat/Sidebar'
import { Team as TeamComponent } from './components/combat/Team'
import { useCombatSetup } from './hooks/useCombatSetup'
import { useCombat } from './hooks/state/useCombat'

function App() {
  const combat = useCombat()

  useTurnController()
  useInputController()
  useAiActions()
  useCleanupController()
  useCombatSetup()

  const userTeam = combat.teams.find((t) => t.id === combat.user)
  const aiTeam = combat.teams.find((t) => t.id !== combat.user)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 flex-col justify-center overflow-auto">
          <div className="flex flex-1 flex-col p-2 justify-between">
            <TeamComponent teamId={aiTeam?.id} />
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
            </div>
            <TeamComponent teamId={userTeam?.id} reverse />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
