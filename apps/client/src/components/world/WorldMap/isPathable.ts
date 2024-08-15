import { ShopEncounterId } from '@/components/encounter/encounters'
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
  const isInteractable =
    state.isActive || (state.isSelectable && distance && distance !== Infinity)

  console.log()
  if (node.id() === ShopEncounterId + '0') {
    console.log(node, distance)
  }
  return isInteractable
}
