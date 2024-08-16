import { NodeSingular } from 'cytoscape'
import { getNodeState, GetNodeStateOptions } from './getNodeState'
import { gePath, GetPathOptions } from './getPath'

export function isPathable(
  node: NodeSingular,
  options: GetPathOptions & GetNodeStateOptions
) {
  const state = getNodeState(node, options)
  const finder = gePath(options)
  const distance = finder?.distanceTo(node)
  const value =
    state.isActive || (state.isSelectable && distance && distance !== Infinity)
  return value
}
