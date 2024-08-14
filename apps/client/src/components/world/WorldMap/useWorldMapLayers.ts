import { GameWorldNode } from '@/hooks/state'
import { getNodeIcon } from '@/utils/getNodeIcon'
import { Core, NodeSingular } from 'cytoscape'
import { IHTMLLayer, LayersPlugin } from 'cytoscape-layers'
import { useRef } from 'react'

export type RenderLayersOptions = {
  activeNode?: NodeSingular
  hoverNode?: NodeSingular
}

export function useWorldMapLayers(cy: Core | undefined) {
  const layers: LayersPlugin = (cy as any)?.layers()
  const htmlLayer = useRef<IHTMLLayer>()

  function renderLayers(options: RenderLayersOptions) {
    if (!layers) return
    if (!htmlLayer.current) {
      htmlLayer.current = layers.append('html')
      htmlLayer.current.updateOnRender = true
    }

    console.log(layers, layers.getLayers())
    const { activeNode, hoverNode } = options
    const activeData = activeNode?.data()
    const result = layers.renderPerNode(
      htmlLayer.current,
      (elem, node, box) => {
        const data: GameWorldNode = node.data()
        const isActive = activeNode?.same(node)
        const isHover = hoverNode?.same(node)
        const isActiveNeightbor = activeData?.edges.includes(node.id())
        elem.innerHTML = getNodeIcon(data.icon)
        elem.style.display = 'flex'
        elem.style.width = '22px'
        elem.style.height = '22px'
        elem.style.justifyContent = 'center'
        elem.style.alignItems = 'center'
        elem.style.opacity = isActive || isActiveNeightbor ? '1' : '0.4'
        elem.style.cursor = 'pointer'
      }
    )

    return result
  }

  return renderLayers
}
