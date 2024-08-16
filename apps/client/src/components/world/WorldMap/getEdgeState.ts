import { Id } from '@repo/game/types'
import { EdgeSingular, NodeSingular } from 'cytoscape'
import { gePath, getOutgoers } from './getPath'

export type GetEdgeStateOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getEdgeState(edge: EdgeSingular, options: GetEdgeStateOptions) {
  const { activeNode, hoverNode, visitedNodeIds } = options
  const visitedNodes = activeNode
    ?.cy()
    .nodes()
    .filter((n) => visitedNodeIds.includes(n.id()))

  const isActive = !!activeNode?.same(edge.source())
  const isActiveNeightbor =
    !!getOutgoers(visitedNodes)?.has(edge) || getOutgoers(activeNode)?.has(edge)
  const finder = gePath(options)
  const isInHoverPath = hoverNode && finder?.pathTo(hoverNode).has(edge)
  const isIsland =
    edge.source().indegree(false) === 0 || edge.target().outdegree(false) === 0

  return {
    isActive,
    isActiveNeightbor,
    isInHoverPath,
    isIsland,
  }
}
