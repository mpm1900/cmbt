import { Id } from '@repo/game/types'
import { NodeSingular, Stylesheet } from 'cytoscape'

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

  const result = hoverNode
    ? activeNode?.cy().elements().aStar({
        root: activeNode,
        goal: hoverNode,
        directed: true,
      })
    : undefined

  return {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (edge) {
        const isActive = isActiveNode(edge.source())
        return isActive && !result?.path?.has(edge) ? 'limegreen' : 'white'
      },
      'line-opacity': function (edge) {
        const source = edge.source()
        const isActive = isActiveNode(source)
        return isActive || result?.path?.has(edge) ? 0.8 : 0.1
      },
      'line-style': (edge) => {
        const isIsland = edge.source().indegree(false) === 0
        return isIsland ? 'dotted' : 'solid'
      },
      'curve-style': 'bezier',
      'target-arrow-shape': 'chevron',
      'arrow-scale': 1,
      'target-arrow-color': function (edge) {
        const isActive = isActiveNode(edge.source())
        return isActive && !result?.path?.has(edge) ? 'limegreen' : 'white'
      },
    },
  }
}
