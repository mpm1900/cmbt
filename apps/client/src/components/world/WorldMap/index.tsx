import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { Core } from 'cytoscape'
import { useState } from 'react'
import { Graph } from './Graph'
import { getNodeState } from './getNodeState'

export function WorldMap() {
  const game = useGame()
  const [cy, set] = useState<Core>()

  function fitAll(_cy: Core) {
    _cy.animate({
      duration: 200,
      fit: {
        eles: _cy.nodes(),
        padding: 64,
      },
    })
  }

  function centerActive(_cy: Core) {
    const active = _cy.nodes(`#${game.world.activeNodeId}`).first()
    _cy.animate({
      duration: 200,
      center: {
        eles: active,
      },
      zoom: 3,
    })
  }

  function fitActiveNeighbors(_cy: Core) {
    const activeNode = _cy.nodes(`#${game.world.activeNodeId}`).first()
    const nodes = _cy.nodes().filter((n) => {
      const state = getNodeState(n, {
        activeNode,
        hoverNode: undefined,
      })
      return state.isActive || !!state.isActiveNeightbor
    })
    const nodesRadio = 1 / (nodes.size() / _cy.nodes().size())
    _cy.animate({
      duration: 200,
      fit: {
        eles: nodes,
        padding: nodesRadio * 32,
      },
    })
  }

  return (
    <>
      {cy && (
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 2 }}>
          <Button variant="ghost" onClick={() => fitAll(cy)}>
            Fit All
          </Button>
          <Button variant="ghost" onClick={() => centerActive(cy)}>
            Center
          </Button>
          <Button variant="ghost" onClick={() => fitActiveNeighbors(cy)}>
            Reset
          </Button>
        </div>
      )}

      <Graph
        cy={(_cy) => {
          set(_cy)
          if (!cy) {
            fitActiveNeighbors(_cy)
          }
        }}
        nodes={game.world.nodes}
        activeNodeId={game.world.activeNodeId}
      />
    </>
  )
}
