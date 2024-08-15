import { Id } from '@repo/game/types'
import { EdgeCollection, NodeSingular, SearchDijkstraResult } from 'cytoscape'

export type GetPathOptions = {
  activeNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function gePath(
  options: GetPathOptions
): SearchDijkstraResult | undefined {
  const { activeNode, visitedNodeIds } = options
  if (!activeNode) return undefined

  const cy = activeNode.cy()
  const visitedNodes = cy.nodes().filter((n) => visitedNodeIds.includes(n.id()))
  const isActiveNeightbor = (node: NodeSingular | EdgeCollection) =>
    !!visitedNodes?.outgoers().has(node) || activeNode?.outgoers().has(node)

  const result = cy
    .elements()
    .filter((e) => {
      return (
        (e.isEdge() && visitedNodeIds.includes(e.source().id())) ||
        visitedNodeIds.includes(e.id()) ||
        isActiveNeightbor(e)
      )
    })
    .dijkstra({
      root: activeNode,
      directed: true,
    })

  return result
}
