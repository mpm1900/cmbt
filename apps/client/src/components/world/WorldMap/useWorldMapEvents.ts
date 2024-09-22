import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { WorldNode } from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { Core, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'
import { getOutgoers } from './getPath'
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
    if (cy && game.world.activeNodeId) {
      const activeNode = cy.nodes(`#${game.world.activeNodeId}`).first()
      const options = {
        activeNode,
        hoverNode,
      }

      cy.on('tap', 'node', function (event) {
        const node = event.target as NodeSingular
        const data: WorldNode = event.target.data()
        const state = isPathableNode(node, options)
        const isInteractable =
          (!state.isCompleted || state.isRepeatable) && state.isPathable

        if (isInteractable) {
          game.setActiveNodeId(data)
          game.updateWorldNode(data.id, (n) => ({
            seen: true,
            visited: true,
          }))
          getOutgoers(node)?.forEach((n) => {
            game.updateWorldNode(n.id(), (n) => ({
              seen: true,
            }))
          })

          encounter.updateEncounter(() => data.encounter)
          game.addVisitedNodes(data.encounter.id)
          nav({ to: '/encounter' })
        }
      })

      cy.on('mouseover', 'node', function (event) {
        const state = isPathableNode(event.target, options)
        const isInteractable =
          (!state.isCompleted || state.isRepeatable) && state.isPathable
        if (isInteractable) {
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
