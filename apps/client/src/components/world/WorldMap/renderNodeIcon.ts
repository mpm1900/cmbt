import { WorldNode } from '@repo/game/types'
import { NodeSingular } from 'cytoscape'
import { getNodeIconRaw } from './getNodeIconRaw'
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
  let icon = data.icon
  if (data.visited && data.visitedIcon) icon = data.visitedIcon
  if (data.seen && data.seenIcon) icon = data.seenIcon
  if (data.completed && data.completedIcon) icon = data.completedIcon
  element.innerHTML = getNodeIconRaw(icon, { size: node.data('size') - 8 })

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
