import { Button } from '@/components/ui/button'
import { GameWorldNode, useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { getNodeIcon } from '@/utils/getNodeIcon'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { useNavigate } from '@tanstack/react-router'
import cytoscape, {
  Core,
  EdgeDefinition,
  LayoutOptions,
  NodeSingular,
} from 'cytoscape'
import cola from 'cytoscape-cola'
import COSE from 'cytoscape-cose-bilkent'
import Layers from 'cytoscape-layers'
import { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

cytoscape.use(COSE)
cytoscape.use(cola)
cytoscape.use(Layers)

const skullSvg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 512 512" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1 1 56-56 56.06 56.06 0 0 1-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1 1 56-56 56.06 56.06 0 0 1-56 56zm104 32z"></path></svg>'

export function WorldAlt() {
  const game = useGame()
  const encounterStore = useEncounter()
  const nav = useNavigate()
  const [cy, set] = useState<Core>()
  const [hoverNode, setHoverNode] = useState<NodeSingular>()

  function renderLayers() {
    if (!cy) return
    // @ts-ignore
    const layers = cy.layers()
    layers.destroy()
    layers.renderPerNode(
      layers.append('html'),
      (elem: HTMLDivElement, node: NodeSingular) => {
        const isHover = node.id() === hoverNode?.id()
        const isActive = node.id() === game.world.activeNodeId
        const neighbors = node
          .incomers()
          .filter((e: NodeSingular) => e.isNode())
          .map((neighbor: NodeSingular) => neighbor.id())
        const isActiveNeightbor = neighbors.includes(game.world.activeNodeId)
        const data: GameWorldNode = node.data()

        elem.innerHTML = getNodeIcon(data.icon)
        elem.style.display = 'flex'
        elem.style.width = isHover ? '26px' : '22px'
        elem.style.height = isHover ? '26px' : '22px'
        elem.style.justifyContent = 'center'
        elem.style.alignItems = 'center'
        elem.style.opacity =
          isActive || (isActiveNeightbor && isHover) ? '1' : '0.5'
        elem.style.cursor =
          isActive || isActiveNeightbor ? 'pointer' : 'default'
      }
    )
  }

  useEffect(() => {
    if (cy) {
      cy.on('tap', 'node', function (event) {
        const node = event.target as NodeSingular
        const data: GameWorldNode = event.target.data()
        const neighbors = node
          .incomers()
          .filter((e: NodeSingular) => e.isNode())
          .map((neighbor: NodeSingular) => neighbor.id())

        const isActive = node.id() === game.world.activeNodeId
        const isActiveNeightbor = neighbors.includes(game.world.activeNodeId)
        if (
          data &&
          data.isInteractable &&
          data.encounter &&
          (isActive || isActiveNeightbor)
        ) {
          game.setActiveNodeId(node.id())
          encounterStore.updateEncounter(() => data.encounter)
          nav({ to: '/encounter' })
        }
      })

      cy.on('mouseover', 'node', function (event) {
        const node = event.cy.nodes(event.target).first()
        setHoverNode(node)
      })
      cy.on('mouseout', 'node', function (event) {
        setHoverNode(undefined)
      })
    }

    return () => {
      cy?.removeAllListeners()
    }
  }, [cy])

  useEffect(() => {
    renderLayers()
  }, [hoverNode])

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      {cy && (
        <Button
          style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 123 }}
          variant="ghost"
          onClick={() => {
            const active = cy.nodes(`#${game.world.activeNodeId}`).first()
            cy.fit()
            cy.center(active)
          }}
        >
          Center
        </Button>
      )}
      {/* @ts-ignore */}
      <CytoscapeComponent
        cy={(cy) => {
          set(cy)
          cy.animate({
            duration: 0,
            complete: renderLayers,
          })
        }}
        autoungrabify={true}
        style={{ height: '100%', overflow: 'hidden' }}
        elements={CytoscapeComponent.normalizeElements({
          nodes: game.world.nodes.map((node) => ({
            data: node,
          })),
          edges: game.world.nodes.flatMap((node) =>
            node.edges.map<EdgeDefinition>((edge) => ({
              data: { source: node.id, target: edge },
            }))
          ),
        })}
        stylesheet={[
          {
            selector: 'node',
            style: {
              label: function (node: NodeSingular) {
                return node.id() === game.world.activeNodeId
                  ? 'you are here'
                  : ''
              },
              'font-size': 3,
              color: 'white',
              height: function (node) {
                return node.data('size')
              },
              width: function (node: NodeSingular) {
                return node.data('size')
              },
              backgroundColor: function (node) {
                const activeIncomers = node.incomers(
                  `#${game.world.activeNodeId}`
                )
                const isActive = node.id() === game.world.activeNodeId
                const isActiveNeightbor = !activeIncomers.empty()

                return isActive
                  ? 'limegreen'
                  : isActiveNeightbor
                    ? 'royalblue'
                    : 'white'
              },
              'outline-width': function (node: NodeSingular) {
                return node.id() === hoverNode?.id() ? 2 : 0
              },
              opacity: function (node: NodeSingular) {
                const activeIncomers = node.incomers(
                  `#${game.world.activeNodeId}`
                )
                const isActive = node.id() === game.world.activeNodeId
                const isActiveNeightbor = !activeIncomers.empty()
                if (
                  hoverNode &&
                  node.same(hoverNode) &&
                  (isActive || isActiveNeightbor)
                )
                  return 1
                return isActive || isActiveNeightbor ? 0.75 : 0.4
              },

              shape: 'round-rectangle',
            },
          },
          {
            selector: 'edge',
            style: {
              'line-color': function (edge) {
                const isActive = edge.source().id() === game.world.activeNodeId
                return isActive ? 'limegreen' : 'white'
              },
              'line-opacity': function (edge) {
                const target = edge.target()
                const source = edge.source()
                const isRoot = source.roots().length > 0
                const isActive = source.id() === game.world.activeNodeId
                const isActiveNeightbor =
                  source.id() === game.world.activeNodeId
                return !isActive && isRoot ? 0 : isActiveNeightbor ? 0.8 : 0.1
              },
              // @ts-ignore
              'curve-style': 'round-segments',
              width: 3,
              'target-arrow-shape': 'triangle',
              'arrow-scale': 0.5,

              'target-arrow-color': function (edge) {
                const isActive = edge.source().id() === game.world.activeNodeId
                return isActive ? 'limegreen' : 'white'
              },
            },
          },
        ]}
        layout={
          {
            name: 'cola',
            animate: false,
            //condense: true,
            padding: 64,
          } as LayoutOptions
        }
      />
    </PageLayout>
  )
}
