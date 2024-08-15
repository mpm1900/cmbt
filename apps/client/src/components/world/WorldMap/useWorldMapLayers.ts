import { GameWorldNode } from '@/hooks/state'
import { getNodeIcon } from '@/utils/getNodeIcon'
import { Id } from '@repo/game/types'
import { Core, NodeSingular } from 'cytoscape'
import { IHTMLLayer, LayersPlugin } from 'cytoscape-layers'
import { useRef } from 'react'
import { getNodeState } from './getNodeState'
import { gePath } from './getPath'

export type RenderLayersOptions = {
  activeNode?: NodeSingular
  visitedNodeIds: Id[]
}

export function useWorldMapLayers(cy: Core | undefined) {
  const layers: LayersPlugin = (cy as any)?.layers()
  const htmlLayer = useRef<IHTMLLayer>()

  function renderNodeLayers(options: RenderLayersOptions) {
    if (!layers) return
    if (!htmlLayer.current) {
      htmlLayer.current = layers.append('html')
      htmlLayer.current.updateOnRender = true
    }

    const { activeNode, visitedNodeIds } = options
    const activeData = activeNode?.data()
    const result = layers.renderPerNode(
      htmlLayer.current,
      (elem, node, box) => {
        const data: GameWorldNode = node.data()
        const { isSelectable, isVisited, isActive, isActiveNeightbor } =
          getNodeState(node, {
            activeNode,
            hoverNode: undefined,
            visitedNodeIds,
          })
        const distance = gePath({ activeNode, visitedNodeIds })?.distanceTo(
          node
        )
        const isInteractable =
          isActive || (isSelectable && distance && distance !== Infinity)
        elem.innerHTML = getNodeIcon(data.icon)
        elem.style.display = 'flex'
        elem.style.width = '22px'
        elem.style.height = '22px'
        elem.style.justifyContent = 'center'
        elem.style.alignItems = 'center'
        elem.style.opacity = isSelectable ? '1' : '0.4'
        elem.style.cursor = isSelectable ? 'pointer' : 'default'
        const child = elem.firstChild as SVGElement
        child.style.fill =
          isInteractable && isVisited && !isActive ? 'black' : 'white'
      }
    )

    return result
  }

  return renderNodeLayers
}
