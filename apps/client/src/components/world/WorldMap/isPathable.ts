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
  const isPathable =
    state.isActive || (state.isSelectable && distance && distance !== Infinity)
  return {
    ...state,
    isPathable,
  }
}

export function isPathableEdge(
  edge: EdgeSingular,
  options: GetPathOptions & GetNodeStateOptions
) {
  const sourceState = isPathableNode(edge.source(), options)
  const targetState = isPathableNode(edge.target(), options)
  const isPathable =
    (sourceState.isActive ||
      (sourceState.isPathable && sourceState.isCompleted)) &&
    !targetState.isActive &&
    targetState.isPathable
  return isPathable
}
