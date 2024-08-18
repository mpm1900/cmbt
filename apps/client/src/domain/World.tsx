import { WorldMap } from '@/components/world/WorldMap'
import { WorldSidebar } from '@/components/world/WorldSidebar'
import { useWorldSetup } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'

export function World() {
  const game = useGame()
  useWorldSetup()

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<WorldSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      <WorldMap />
    </PageLayout>
  )
}
