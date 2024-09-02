import { getNodeIconRaw } from '@/utils/getNodeIconRaw'
import { WorldNode } from '@repo/game/types'
import { NodeSingular } from 'cytoscape'
import { isPathableNode } from './isPathable'
import { RenderLayersOptions } from './useWorldMapLayers'

export function renderNodeIcon(
  element: HTMLElement,
  node: NodeSingular,
  options: RenderLayersOptions
) {
  const data: WorldNode = node.data()
  const state = isPathableNode(node, options)
  element.style.width = `${node.data('size') + 2}px`
  element.style.height = `${node.data('size') + 2}px`
  element.innerHTML = getNodeIconRaw(
    data.completed
      ? data.completedIcon
      : data.visited
        ? (data.visitedIcon ?? data.icon)
        : data.icon,
    { size: node.data('size') - 8 }
  )

  element.style.display = 'flex'
  element.style.justifyContent = 'center'
  element.style.alignItems = 'center'
  element.style.opacity = state.isPathable ? '1' : '0.4'
  element.style.cursor = state.isPathable ? 'pointer' : 'default'
  const child = element.firstChild as SVGElement
  child.style.fill =
    state.isPathable &&
    state.isCompleted &&
    !state.isRepeatable &&
    !state.isActive
      ? 'black'
      : 'white'

  return element
}
