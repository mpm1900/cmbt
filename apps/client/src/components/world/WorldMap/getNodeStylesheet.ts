import { Id } from '@repo/game/types'
import { NodeSingular, Stylesheet } from 'cytoscape'
import { getNodeState } from './getNodeState'

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
      'font-size': 3,
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
        const { isActive, isActiveNeightbor, isVisited } = getNodeState(
          node,
          options
        )

        return isActive
          ? 'limegreen'
          : isActiveNeightbor && !isVisited
            ? 'royalblue'
            : 'white'
      },
      'border-color': 'white',
      'border-opacity': 1,

      opacity: function (node: NodeSingular) {
        const { isHover, isSelectable } = getNodeState(node, options)
        if (isHover && isSelectable) return 1
        return isSelectable ? 0.75 : 0.2
      },

      shape: 'round-rectangle',
    },
  }
}
