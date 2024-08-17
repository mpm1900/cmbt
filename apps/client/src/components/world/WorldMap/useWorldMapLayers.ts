import { getNodeIconRaw } from '@/utils/getNodeIconRaw'
import { GameWorldNode } from '@repo/game/types'
import { Core, NodeSingular } from 'cytoscape'
import { IHTMLLayer, LayersPlugin } from 'cytoscape-layers'
import { useRef } from 'react'
import { isPathableNode } from './isPathable'

export type RenderLayersOptions = {
  activeNode: NodeSingular | undefined
  hoverNode: NodeSingular | undefined
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

    const result = layers.renderPerNode(
      htmlLayer.current,
      (elem, node, box) => {
        const data: GameWorldNode = node.data()
        const state = isPathableNode(node, options)
        elem.innerHTML = getNodeIconRaw(data.icon)
        elem.style.width = `${node.data('size') + 2}px`
        elem.style.height = `${node.data('size') + 2}px`
        elem.style.display = 'flex'
        elem.style.justifyContent = 'center'
        elem.style.alignItems = 'center'
        elem.style.opacity = state.isPathable ? '1' : '0.4'
        elem.style.cursor = state.isPathable ? 'pointer' : 'default'
        const child = elem.firstChild as SVGElement
        child.style.fill =
          state.isPathable &&
          state.isCompleted &&
          !state.isRepeatable &&
          !state.isActive
            ? 'black'
            : 'white'
      }
    )

    return result
  }

  return renderNodeLayers
}
