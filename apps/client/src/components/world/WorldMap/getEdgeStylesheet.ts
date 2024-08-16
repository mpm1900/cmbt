import { Id } from '@repo/game/types'
import { NodeSingular, Stylesheet } from 'cytoscape'
import { getEdgeState } from './getEdgeState'

export type GetEdgeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
  visitedNodeIds: Id[]
}

export function getEdgeStylesheet(
  options: GetEdgeStylesheetOptions
): Stylesheet {
  return {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (edge) {
        const enabled = edge.data('enabled')
        if (!enabled) return 'red'
        return 'white'
      },
      'line-opacity': function (edge) {
        const state = getEdgeState(edge, options)
        const enabled = edge.data('enabled')
        if (!enabled) return 0.1
        return state.isInHoverPath ? 0.8 : 0.1
      },
      'line-style': (edge) => {
        const state = getEdgeState(edge, options)
        if (state.isIsland) return 'dotted'
        return state.isActiveNeightbor ? 'solid' : 'dashed'
      },
      'line-dash-pattern': [12, 3],
      'curve-style': 'bezier',
      'target-arrow-shape': 'chevron',
      'arrow-scale': 1,
      'target-arrow-color': function (edge) {
        const enabled = edge.data('enabled')
        if (!enabled) return 'red'
        return 'white'
      },
    },
  }
}
