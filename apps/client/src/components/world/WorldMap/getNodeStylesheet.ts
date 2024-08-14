import { NodeSingular, Stylesheet } from 'cytoscape'

export type GetNodeStylesheetOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
}

export function getNodeStylesheet(
  options: GetNodeStylesheetOptions
): Stylesheet {
  const { activeNode, hoverNode } = options
  const isActiveNode = (node: NodeSingular) =>
    (activeNode && node.same(activeNode)) || false
  const isActiveNeightborNode = (node: NodeSingular) => {
    const activeIncomers = node.incomers(`#${activeNode?.id()}`)
    return !activeIncomers.empty()
  }
  const isHoverNode = (node: NodeSingular) =>
    (hoverNode && node.same(hoverNode)) || false

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
        const isActive = isActiveNode(node)
        const isActiveNeightbor = isActiveNeightborNode(node)

        return isActive
          ? 'limegreen'
          : isActiveNeightbor
            ? 'royalblue'
            : 'white'
      },
      // @ts-ignore
      /*
      'outline-width': function (node: NodeSingular) {
        const isActive = isActiveNode(node)
        const isActiveNeightbor = isActiveNeightborNode(node)
        return (isActive || isActiveNeightbor) && node.id() === hoverNode?.id()
          ? 2
          : 0
      },
      */
      'border-color': 'white',
      'border-opacity': 1,

      opacity: function (node: NodeSingular) {
        const isActive = isActiveNode(node)
        const isActiveNeightbor = isActiveNeightborNode(node)
        const isHover = isHoverNode(node)
        if (isHover && (isActive || isActiveNeightbor)) return 1
        return isActive || isActiveNeightbor ? 0.75 : 0.4
      },

      shape: 'round-rectangle',
    },
  }
}
