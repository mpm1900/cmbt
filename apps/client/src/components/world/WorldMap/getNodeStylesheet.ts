import { NodeSingular, Stylesheet } from 'cytoscape'
import { isPathableNode } from './isPathable'

function getNodeBackgroundColor(
  node: NodeSingular,
  options: GetNodeStylesheetOptions
) {
  const state = isPathableNode(node, options)
  const isActiveable =
    state.isCompleted && state.isActive ? state.isRepeatable : state.isActive
  if (isActiveable) return 'limegreen'
  if (state.isActive) return '#cce3cc'
  if (
    state.isActiveNeightbor &&
    !state.isCompleted &&
    state.isPathable &&
    state.isLocked
  )
    return 'plum'
  if (state.isActiveNeightbor && !state.isCompleted && state.isPathable)
    return 'royalblue'
  if (
    state.isActiveNeightbor &&
    state.isCompleted &&
    state.isPathable &&
    state.isRepeatable
  ) {
    return 'mediumturquoise'
  }

  return 'white'
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
