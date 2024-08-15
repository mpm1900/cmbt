import { GameWorldNode, useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { useNavigate } from '@tanstack/react-router'
import { Core, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'
import { getNodeState } from './getNodeState'

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
      const activeNode = cy.nodes(`#${game.world.activeNodeId}`).first()
      const options = {
        activeNode,
        hoverNode,
        visitedNodeIds: game.world.visitiedNodeIds,
      }

      cy.on('tap', 'node', function (event) {
        const node = event.target as NodeSingular
        const data: GameWorldNode = event.target.data()
        const { isSelectable } = getNodeState(node, options)
        if (data && data.isInteractable && data.encounter && isSelectable) {
          game.setActiveNodeId(node.data())
          encounter.updateEncounter(() => data.encounter)
          nav({ to: '/encounter' })
        }
      })

      cy.on('mouseover', 'node', function (event) {
        const { isSelectable } = getNodeState(event.target, options)
        if (isSelectable) {
          setHoverNode(event.target)
        }
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
