import { Id } from '@repo/game/types'
import { NodeSingular, Stylesheet } from 'cytoscape'
import { gePath } from './getPath'

export type GetEdgeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getEdgeStylesheet(
  options: GetEdgeStylesheetOptions
): Stylesheet {
  const { activeNode, hoverNode } = options
  const isActiveNode = (node: NodeSingular) =>
    (activeNode && node.same(activeNode)) || false
  const finder = gePath(options)

  return {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (edge) {
        return 'white'
      },
      'line-opacity': function (edge) {
        const isActive = isActiveNode(edge.source())
        return isActive || (hoverNode && finder?.pathTo(hoverNode).has(edge))
          ? 0.8
          : 0.1
      },
      'line-style': (edge) => {
        const isIsland = edge.source().indegree(false) === 0
        return isIsland ? 'dotted' : 'solid'
      },
      'curve-style': 'bezier',
      'target-arrow-shape': 'chevron',
      'arrow-scale': 1,
      'target-arrow-color': function (edge) {
        return 'white'
      },
    },
  }
}
