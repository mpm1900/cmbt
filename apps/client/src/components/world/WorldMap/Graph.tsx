import { GameWorldNode } from '@/hooks/state'
import { Id } from '@repo/game/types'
import cytoscape, { Core, EdgeDefinition, LayoutOptions } from 'cytoscape'
import cola from 'cytoscape-cola'
import COSE from 'cytoscape-cose-bilkent'
import Layers, { IRenderPerNodeResult } from 'cytoscape-layers'
import { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { getEdgeStylesheet } from './getEdgeStylesheet'
import { getNodeStylesheet } from './getNodeStylesheet'
import { useWorldMapEvents } from './useWorldMapEvents'
import { useWorldMapLayers } from './useWorldMapLayers'

cytoscape.use(COSE)
cytoscape.use(cola)
cytoscape.use(Layers)

export type GraphProps = {
  activeNodeId: Id
  nodes: GameWorldNode[]
  cy?: (cy: Core) => void
}

export function Graph(props: GraphProps) {
  const { activeNodeId, nodes } = props
  const [cy, setCy] = useState<Core>()
  const [layerResult, setLayerResult] = useState<IRenderPerNodeResult>()
  const activeNode = cy?.nodes(`#${activeNodeId}`).first()
  const { hoverNode } = useWorldMapEvents(cy)
  const renderLayers = useWorldMapLayers(cy)

  useEffect(() => {
    const result = renderLayers({ activeNode, hoverNode })
    setLayerResult(result)
  }, [cy])

  return (
    <CytoscapeComponent
      cy={(cy) => {
        setCy(cy)
        if (props.cy) props.cy(cy)
      }}
      autoungrabify={true}
      style={{ height: '100%', overflow: 'hidden' }}
      elements={CytoscapeComponent.normalizeElements({
        nodes: nodes.map((node) => ({
          data: node,
        })),
        edges: nodes.flatMap((node) =>
          node.edges.map<EdgeDefinition>((edge) => ({
            data: { source: node.id, target: edge },
          }))
        ),
      })}
      stylesheet={[
        getNodeStylesheet({
          activeNode,
          hoverNode,
        }),
        getEdgeStylesheet({
          activeNode,
        }),
      ]}
      layout={
        {
          name: 'cola',
          animate: false,
          padding: 64,
        } as LayoutOptions
      }
    />
  )
}
