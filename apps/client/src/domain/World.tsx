import { WorldMap } from '@/components/world/WorldMap'
import { useWorldSetup } from '@/hooks'
import { useGame } from '@/hooks/state'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'

export function World() {
  const game = useGame()
  useWorldSetup()

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      <WorldMap />
    </PageLayout>
  )
}
