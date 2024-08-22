import { GameWorldNode } from '@repo/game/types'
import { NodeSingular } from 'cytoscape'
import { getOutgoers } from './getPath'

export type GetNodeStateOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
}

export function getNodeState(node: NodeSingular, options: GetNodeStateOptions) {
  const { activeNode, hoverNode } = options

  const completedNodes = activeNode
    ?.cy()
    .nodes()
    .filter((n) => n.data('completed'))
  const data: GameWorldNode = node.data()
  const isActive = !!activeNode?.same(node)
  const isActiveNeightbor =
    (!isActive && !!getOutgoers(completedNodes)?.has(node)) ||
    getOutgoers(activeNode)?.has(node)
  const isHover = !!hoverNode?.same(node)
  const isCompleted = !!completedNodes?.has(node)
  const isRepeatable = !!data.repeatable
  const isLocked = !!data.locked
  const isVisited = !!data.visited
  const isSelectable =
    isActive || isActiveNeightbor || (isCompleted && isRepeatable)

  return {
    isActive,
    isActiveNeightbor,
    isCompleted,
    isHover,
    isLocked,
    isRepeatable,
    isSelectable,
    isVisited,
  }
}
