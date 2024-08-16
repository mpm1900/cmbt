import { Id } from '@repo/game/types'
import { NodeSingular, Stylesheet } from 'cytoscape'
import { getNodeState } from './getNodeState'
import { isPathableNode } from './isPathable'

export type GetNodeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getNodeStylesheet(
  options: GetNodeStylesheetOptions
): Stylesheet {
  return {
    selector: 'node',
    style: {
      //label: (node: NodeSingular) => node.data('completed'),
      'font-size': 12,
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
        const { isActive, isActiveNeightbor, isCompleted } = getNodeState(
          node,
          options
        )
        const isInteractable = isPathableNode(node, options)
        if (isActive) return 'limegreen'
        if (isActiveNeightbor && !isCompleted && isInteractable)
          return 'royalblue'

        return isActiveNeightbor &&
          isCompleted &&
          isInteractable &&
          node.data('repeatable')
          ? 'lightblue'
          : 'white'
      },
      'border-color': 'white',
      'border-opacity': 1,

      opacity: function (node: NodeSingular) {
        const { isHover } = getNodeState(node, options)
        const isInteractable = isPathableNode(node, options)
        if (isHover && isInteractable) return 1
        return isInteractable ? 0.75 : 0.2
      },

      shape: 'round-rectangle',
    },
  }
}
