import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { Core } from 'cytoscape'
import { useState } from 'react'
import { Graph } from './Graph'
import { getNodeState } from './getNodeState'

export function WorldMap() {
  const game = useGame()
  const [cy, set] = useState<Core>()

  function fitAll() {
    if (cy) {
      cy.fit(undefined, 64)
    }
  }

  function centerActive() {
    if (cy) {
      const active = cy.nodes(`#${game.world.activeNodeId}`).first()
      cy.fit()
      cy.center(active)
    }
  }

  function fitVisitied(_cy: Core) {
    const activeNode = _cy.nodes(`#${game.world.activeNodeId}`).first()
    const nodes = _cy.nodes().filter((n) => {
      const state = getNodeState(n, {
        activeNode,
        hoverNode: undefined,
      })
      return state.isVisited || !!state.isActiveNeightbor
    })
    const nodesRadio = 1 / (nodes.size() / _cy.nodes().size())
    _cy.fit(nodes, nodesRadio * 32)
  }

  return (
    <>
      {cy && (
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 2 }}>
          <Button variant="ghost" onClick={fitAll}>
            Fit All
          </Button>
          <Button variant="ghost" onClick={centerActive}>
            Center
          </Button>
          <Button variant="ghost" onClick={() => fitVisitied(cy)}>
            Reset
          </Button>
        </div>
      )}

      <Graph
        cy={(_cy) => {
          set(_cy)
          if (!cy) {
            fitVisitied(_cy)
          }
        }}
        nodes={game.world.nodes}
        activeNodeId={game.world.activeNodeId}
      />
    </>
  )
}
