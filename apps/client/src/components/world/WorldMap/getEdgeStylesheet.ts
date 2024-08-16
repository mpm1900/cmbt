import { NodeSingular, Stylesheet } from 'cytoscape'
import { getEdgeState } from './getEdgeState'
import { getNodeState } from './getNodeState'
import { isPathableEdge } from './isPathable'

export type GetEdgeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
}

export function getEdgeStylesheet(
  options: GetEdgeStylesheetOptions
): Stylesheet {
  return {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (edge) {
        return 'white'
      },
      'line-opacity': function (edge) {
        const state = getEdgeState(edge, options)
        const sourceState = getNodeState(edge.source(), options)
        const targetState = getNodeState(edge.target(), options)
        if (sourceState.isLocked && !targetState.isCompleted) return 0
        if (state.isInHoverPath) return 0.8
        const isPathable = isPathableEdge(edge, options)
        return isPathable ? 0.3 : 0.1
      },
      'line-style': (edge) => {
        const state = getEdgeState(edge, options)
        if (state.isIsland) return 'dotted'
        const isPathable = isPathableEdge(edge, options)
        return isPathable ? 'solid' : 'dashed'
      },
      'line-dash-pattern': [12, 4],
      'curve-style': 'bezier' as any,
      'target-arrow-shape': 'chevron',
      'arrow-scale': 1,
      'target-arrow-color': function (edge) {
        return 'white'
      },
    },
  }
}
