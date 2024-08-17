import { Core, NodeSingular } from 'cytoscape'
import { IHTMLLayer, LayersPlugin } from 'cytoscape-layers'
import { useRef } from 'react'
import { renderNodeIcon } from './renderNodeIcon'

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
        renderNodeIcon(elem, node, options)
      }
    )

    return result
  }

  return renderNodeLayers
}
