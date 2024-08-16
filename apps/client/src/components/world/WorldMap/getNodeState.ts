import { Id } from '@repo/game/types'
import { NodeSingular } from 'cytoscape'
import { getOutgoers } from './getPath'

export type GetNodeStateOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getNodeState(node: NodeSingular, options: GetNodeStateOptions) {
  const { activeNode, hoverNode, visitedNodeIds } = options

  const visitedNodes = activeNode
    ?.cy()
    .nodes()
    .filter((n) => visitedNodeIds.includes(n.id()))
  const isActive = !!activeNode?.same(node)
  const isActiveNeightbor =
    !!getOutgoers(visitedNodes)?.has(node) || getOutgoers(activeNode)?.has(node)
  const isHover = !!hoverNode?.same(node)
  const isVisited = visitedNodes?.has(node)
  const isSelectable = isActive || isActiveNeightbor || isVisited

  return {
    isActive,
    isActiveNeightbor,
    isHover,
    isVisited,
    isSelectable,
  }
}
