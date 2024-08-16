import { Id } from '@repo/game/types'
import {
  CollectionReturnValue,
  EdgeCollection,
  NodeSingular,
  SearchDijkstraResult,
} from 'cytoscape'

export type GetPathOptions = {
  activeNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getPath(
  options: GetPathOptions
): SearchDijkstraResult | undefined {
  const { activeNode, visitedNodeIds } = options
  if (!activeNode) return undefined

  const cy = activeNode.cy()
  const visitedNodes = cy.nodes().filter((n) => visitedNodeIds.includes(n.id()))
  const isActiveNeightbor = (node: NodeSingular | EdgeCollection) =>
    !!getOutgoers(visitedNodes)?.has(node) ||
    getOutgoers(activeNode)?.has(node) ||
    false

  const result = cy
    .elements()
    .filter((e) => {
      const valid =
        (e.isEdge() && visitedNodeIds.includes(e.source().id())) ||
        visitedNodeIds.includes(e.id()) ||
        isActiveNeightbor(e)

      return valid
    })
    .dijkstra({
      root: activeNode,
      directed: true,
    })

  return result
}

export function getOutgoers(
  node: CollectionReturnValue | NodeSingular | undefined
) {
  return node?.outgoers().filter((e) => e.isNode() || e.isEdge())
}
