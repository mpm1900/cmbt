import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { Core } from 'cytoscape'
import { useState } from 'react'
import { Graph } from './Graph'

export function WorldMap() {
  const game = useGame()
  const [cy, set] = useState<Core>()
  return (
    <>
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
    </>
  )
}
