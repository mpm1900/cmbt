import { EdgeSingular, NodeSingular } from 'cytoscape'
import { getNodeState, GetNodeStateOptions } from './getNodeState'
import { getPath, GetPathOptions } from './getPath'

export function isPathableNode(
  node: NodeSingular,
  options: GetPathOptions & GetNodeStateOptions
) {
  const state = getNodeState(node, options)
  const finder = getPath(options)
  const distance = finder?.distanceTo(node)
  const value =
    state.isActive || (state.isSelectable && distance && distance !== Infinity)
  return value
}

export function isPathableEdge(
  edge: EdgeSingular,
  options: GetPathOptions & GetNodeStateOptions
) {
  const targetState = getNodeState(edge.target(), options)
  const isSourcePathable = isPathableNode(edge.source(), options)
  const isTargetPathable = isPathableNode(edge.target(), options)
  return !targetState.isActive && isSourcePathable && isTargetPathable
}
