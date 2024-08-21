import { GameStartModal } from '@/components/world/GameStartModal'
import { WorldMap } from '@/components/world/WorldMap'
import { WorldSidebar } from '@/components/world/WorldSidebar'
import { useWorldSetup } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { useEffect, useState } from 'react'

export function World() {
  const game = useGame()
  useWorldSetup()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (game.world.activeNodeId === game.world.startingNodeId) {
        setReady(true)
      }
    }, 350)
  }, [])

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<WorldSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      <WorldMap />
      {game.world.activeNodeId === game.world.startingNodeId && ready && (
        <GameStartModal />
      )}
    </PageLayout>
  )
}
