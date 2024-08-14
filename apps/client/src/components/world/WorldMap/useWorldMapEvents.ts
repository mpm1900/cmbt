import { GameWorldNode, useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { useNavigate } from '@tanstack/react-router'
import { Core, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'

export type UseWorldMapEventsProps = {
  cy?: Core
}

export function useWorldMapEvents(cy: Core | undefined) {
  const [hoverNode, setHoverNode] = useState<NodeSingular>()
  const game = useGame()
  const encounter = useEncounter()
  const nav = useNavigate()

  useEffect(() => {
    if (cy) {
      cy.on('tap', 'node', function (event) {
        const node = event.target as NodeSingular
        const data: GameWorldNode = event.target.data()
        const neighbors = node
          .incomers()
          .filter((e: NodeSingular) => e.isNode())
          .map((neighbor: NodeSingular) => neighbor.id())

        const isActive = node.id() === game.world.activeNodeId
        const isActiveNeightbor = neighbors.includes(game.world.activeNodeId)
        if (
          data &&
          data.isInteractable &&
          data.encounter &&
          (isActive || isActiveNeightbor)
        ) {
          game.setActiveNodeId(node.id())
          encounter.updateEncounter(() => data.encounter)
          nav({ to: '/encounter' })
        }
      })

      cy.on('mouseover', 'node', function (event) {
        setHoverNode(event.target)
      })
      cy.on('mouseout', 'node', function (event) {
        setHoverNode(undefined)
      })
    }

    return () => {
      cy?.removeAllListeners()
    }
  }, [cy])

  return { hoverNode }
}
