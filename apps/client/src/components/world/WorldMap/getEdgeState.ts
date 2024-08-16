import { Id } from '@repo/game/types'
import { EdgeSingular, NodeSingular } from 'cytoscape'
import { getOutgoers, getPath } from './getPath'

export type GetEdgeStateOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getEdgeState(edge: EdgeSingular, options: GetEdgeStateOptions) {
  const { activeNode, hoverNode, visitedNodeIds } = options
  const completedNodes = activeNode
    ?.cy()
    .nodes()
    .filter((n) => n.data('completed'))

  const isActive = !!activeNode?.same(edge.source())
  const isCompleted = completedNodes?.incomers().has(edge)
  const isActiveNeightbor =
    !!getOutgoers(completedNodes)?.has(edge) ||
    getOutgoers(activeNode)?.has(edge)
  const finder = getPath(options)
  const isInHoverPath = hoverNode && finder?.pathTo(hoverNode).has(edge)
  const isIsland =
    edge.source().indegree(false) === 0 || edge.target().outdegree(false) === 0

  return {
    isActive,
    isActiveNeightbor,
    isInHoverPath,
    isIsland,
    isCompleted,
  }
}
