import { ActiveUnit } from '@/components/combat/ActiveUnit'
import { CleanupSwitchUnits } from '@/components/combat/CleanupSwitchUnits'
import { CombatComplete } from '@/components/combat/CombatComplete'
import { CombatHeader } from '@/components/combat/CombatHeader'
import { RequireTurnStatus } from '@/components/combat/RequireTurnStatus'
import { RunningTurn } from '@/components/combat/RunningTurn'
import { Sidebar } from '@/components/combat/Sidebar'
import { Team } from '@/components/combat/Team'
import { VantaContextProvider } from '@/hooks'
import {
  useAiActions,
  useCleanupController,
  useCombatController,
  useEndController,
  useMainController,
  useResultsController,
  useUpkeepController,
} from '@/hooks/controllers'
import { useCombat } from '@/hooks/state'
import { useCombatSetup } from '@/hooks/useCombatSetup'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'

export function Combat() {
  const { teams, user } = useCombat((s) => ({
    teams: s.teams,
    user: s.user,
  }))

  useCombatSetup()
  useResultsController()
  useUpkeepController()
  useMainController()
  useCombatController()
  useCleanupController()
  useEndController()
  useAiActions()

  const userTeam = teams.find((t) => t.id === user)
  const aiTeam = teams.find((t) => t.id !== user)

  return (
    <VantaContextProvider>
      <PageLayout
        navbar={<Navbar />}
        header={<CombatHeader />}
        aside={<Sidebar />}
      >
        <div className="flex flex-col p-2 h-full">
          <Team teamId={aiTeam?.id} />
          <div className="flex flex-1 items-center justify-center">
            <RequireTurnStatus status="done">
              <CombatComplete />
            </RequireTurnStatus>
            <RequireTurnStatus status="combat">
              <RunningTurn />
            </RequireTurnStatus>
            <RequireTurnStatus status="main">
              <ActiveUnit />
            </RequireTurnStatus>
            <RequireTurnStatus status="cleanup">
              <CleanupSwitchUnits />
            </RequireTurnStatus>
          </div>
          <Team teamId={userTeam?.id} reverse />
        </div>
      </PageLayout>
    </VantaContextProvider>
  )
}
