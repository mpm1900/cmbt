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
  const isActive = !!activeNode?.same(node)
  const isActiveNeightbor =
    !!getOutgoers(completedNodes)?.has(node) ||
    getOutgoers(activeNode)?.has(node)
  const isHover = !!hoverNode?.same(node)
  const isCompleted = !!completedNodes?.has(node)
  const isSelectable =
    isActive || isActiveNeightbor || (isCompleted && node.data('repeatable'))

  return {
    isActive,
    isActiveNeightbor,
    isCompleted,
    isHover,
    isRepeatable: !!node.data('repeatable'),
    isSelectable,
  }
}
