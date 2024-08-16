import { EdgeSingular, NodeSingular } from 'cytoscape'
import { getNodeState, GetNodeStateOptions } from './getNodeState'
import { getPath, GetPathOptions } from './getPath'

export function isPathable(
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
  const isSourcePathable = isPathable(edge.source(), options)
  const isTargetPathable = isPathable(edge.target(), options)
  return !targetState.isActive && isSourcePathable && isTargetPathable
}
