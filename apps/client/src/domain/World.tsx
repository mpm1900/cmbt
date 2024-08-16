import { Button } from '@/components/ui/button'
import { Graph } from '@/components/world/WorldMap/Graph'
import { useEncounterContext } from '@/hooks'
import { useGame } from '@/hooks/state'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { useNavigate } from '@tanstack/react-router'
import { Core } from 'cytoscape'
import { useState } from 'react'

export function World() {
  const game = useGame()
  const ctx = useEncounterContext()
  const [cy, set] = useState<Core>()
  const nav = useNavigate()

  if (!game.team.id) nav({ to: '/' })

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      {cy && (
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 2 }}>
          <Button
            variant="ghost"
            onClick={() => {
              cy.fit(undefined, 64)
            }}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const active = cy.nodes(`#${game.world.activeNodeId}`).first()
              cy.fit()
              cy.center(active)
            }}
          >
            Center
          </Button>
        </div>
      )}

      <Graph
        cy={(cy) => set(cy)}
        nodes={game.world.nodes}
        activeNodeId={game.world.activeNodeId}
      />
    </PageLayout>
  )
}
