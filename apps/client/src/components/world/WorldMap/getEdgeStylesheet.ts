import { NodeSingular, Stylesheet } from 'cytoscape'

export type GetEdgeStylesheetOptions = {
  activeNode: NodeSingular | undefined
}

export function getEdgeStylesheet(
  options: GetEdgeStylesheetOptions
): Stylesheet {
  const { activeNode } = options
  const isActiveNode = (node: NodeSingular) =>
    (activeNode && node.same(activeNode)) || false

  return {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (edge) {
        const isActive = isActiveNode(edge.source())
        return isActive ? 'limegreen' : 'white'
      },
      'line-opacity': function (edge) {
        const source = edge.source()
        const isRoot = source.roots().length > 0
        const isActive = isActiveNode(source)
        return !isActive && isRoot ? 0 : isActive ? 0.8 : 0.1
      },
      'curve-style': 'round-segments' as any,
      'target-arrow-shape': 'triangle',
      'arrow-scale': 0.5,
      'target-arrow-color': function (edge) {
        const isActive = isActiveNode(edge.source())
        return isActive ? 'limegreen' : 'white'
      },
    },
  }
}
