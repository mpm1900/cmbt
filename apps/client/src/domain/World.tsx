import { Button } from '@/components/ui/button'
import { Graph } from '@/components/world/WorldMap/Graph'
import { useGame } from '@/hooks/state'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { Core } from 'cytoscape'
import { useState } from 'react'

export function World() {
  const game = useGame()
  const [cy, set] = useState<Core>()

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      {cy && (
        <Button
          style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 123 }}
          variant="ghost"
          onClick={() => {
            const active = cy.nodes(`#${game.world.activeNodeId}`).first()
            cy.fit()
            cy.center(active)
          }}
        >
          Center
        </Button>
      )}

      <Graph
        cy={(cy) => set(cy)}
        nodes={game.world.nodes}
        activeNodeId={game.world.activeNodeId}
      />
    </PageLayout>
  )
}
