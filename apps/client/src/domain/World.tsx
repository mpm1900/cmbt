import { GameStartModal } from '@/components/world/GameStartModal'
import { WorldHeader } from '@/components/world/WorldHeader'
import { WorldMap } from '@/components/world/WorldMap'
import { WorldSidebar } from '@/components/world/WorldSidebar'
import { useWorldSetup, VantaContextProvider } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
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
    }, 300)
  }, [])

  return (
    <VantaContextProvider>
      <PageLayout
        navbar={<Navbar />}
        aside={<WorldSidebar />}
        header={<WorldHeader />}
      >
        <WorldMap />
        {game.world.activeNodeId === game.world.startingNodeId && ready && (
          <GameStartModal />
        )}
      </PageLayout>
    </VantaContextProvider>
  )
}
