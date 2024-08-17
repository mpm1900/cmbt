import { WorldMap } from '@/components/world/WorldMap'
import { useWorldSetup } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { WorldSidebar } from '@shared/WorldSidebar'

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
