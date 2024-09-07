import { WORLD_NODE_COLORS } from '@/constants/world'
import { NodeSingular, Stylesheet } from 'cytoscape'
import { isPathableNode } from './isPathable'

function getNodeBackgroundColor(
  node: NodeSingular,
  options: GetNodeStylesheetOptions
) {
  const state = isPathableNode(node, options)
  const isActiveSelectable =
    state.isCompleted && state.isActive ? state.isRepeatable : state.isActive

  if (isActiveSelectable) return WORLD_NODE_COLORS.IsActiveSelectable
  if (state.isActive) return WORLD_NODE_COLORS.IsActiveUnselectable
  if (
    state.isActiveNeightbor &&
    !state.isCompleted &&
    state.isPathable &&
    state.isLocked
  )
    return WORLD_NODE_COLORS.IsLockedSelectable
  if (state.isActiveNeightbor && !state.isCompleted && state.isPathable)
    return WORLD_NODE_COLORS.IsNotCompleteSelectable
  if (
    state.isActiveNeightbor &&
    state.isCompleted &&
    state.isPathable &&
    state.isRepeatable
  ) {
    return WORLD_NODE_COLORS.IsCompleteSelectable
  }

  return WORLD_NODE_COLORS.IsUnselectable
}

export type GetNodeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
}

export function getNodeStylesheet(
  options: GetNodeStylesheetOptions
): Stylesheet {
  return {
    selector: 'node',
    style: {
      label: (node: NodeSingular) => {
        // return node.data().seen
        const { activeNode } = options
        if (activeNode?.same(node)) {
          return '*'
        }
        return ''
      },
      'font-size': 10,
      color: 'white',
      height: function (node) {
        const size = node.data('size')
        return size
      },
      width: function (node: NodeSingular) {
        const size = node.data('size')
        return size
      },
      backgroundColor: function (node) {
        return getNodeBackgroundColor(node, options)
      },
      'border-color': 'white',
      'border-opacity': 1,

      opacity: function (node: NodeSingular) {
        const state = isPathableNode(node, options)
        const isActiveable =
          state.isCompleted && state.isPathable
            ? state.isRepeatable
            : state.isActive

        if (isActiveable && state.isHover) return 1
        if (
          state.isActiveNeightbor &&
          !state.isCompleted &&
          state.isPathable &&
          state.isHover
        )
          return 1
        return state.isPathable ? 0.75 : 0.2
      },

      shape: 'round-rectangle',
    },
  }
}
