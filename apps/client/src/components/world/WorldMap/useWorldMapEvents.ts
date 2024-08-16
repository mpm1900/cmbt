import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { GameWorldNode } from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { Core, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'
import { getNodeState } from './getNodeState'
import { isPathableNode } from './isPathable'

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
      }

      cy.on('tap', 'node', function (event) {
        const node = event.target as NodeSingular
        const data: GameWorldNode = event.target.data()
        const state = isPathableNode(node, options)
        const isInteractable = !state.isCompleted || state.isRepeatable

        if (isInteractable && data.encounter && state.isPathable) {
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
