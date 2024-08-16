import {
  CollectionReturnValue,
  EdgeCollection,
  NodeSingular,
  SearchDijkstraResult,
} from 'cytoscape'

export type GetPathOptions = {
  activeNode: NodeSingular | undefined
}

export function getPath(
  options: GetPathOptions
): SearchDijkstraResult | undefined {
  const { activeNode } = options
  if (!activeNode) return undefined

  const cy = activeNode.cy()

  const completedNodes = activeNode
    ?.cy()
    .nodes()
    .filter((n) => n.data('completed'))
  const isActiveNeightbor = (node: NodeSingular | EdgeCollection) =>
    !!getOutgoers(completedNodes)?.has(node) || false

  const result = cy
    .elements()
    .filter((e) => {
      const valid =
        (e.isEdge() &&
          (e.source().same(activeNode) || completedNodes.has(e.source()))) ||
        completedNodes.has(e) ||
        isActiveNeightbor(e)

      return valid
    })
    .dijkstra({
      root: activeNode,
      directed: true,
    })

  return result
}

export function getOutgoers(
  node: CollectionReturnValue | NodeSingular | undefined
) {
  return node?.outgoers().filter((e) => e.isNode() || e.isEdge())
}
