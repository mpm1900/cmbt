import { GraphResetButton } from '@/components/world/GraphResetButton'
import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSigma,
} from '@react-sigma/core'
import { useLayoutNoverlap } from '@react-sigma/layout-noverlap'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { createNodeImageProgram } from '@sigma/node-image'
import { useNavigate } from '@tanstack/react-router'
import { MultiDirectedGraph } from 'graphology'
import { useEffect, useMemo } from 'react'
import { Settings } from 'sigma/settings'

function LoadGraph() {
  const loadGraph = useLoadGraph()
  const game = useGame()
  const encounter = useEncounter()
  const sigma = useSigma()
  const registerEvents = useRegisterEvents()
  const { assign } = useLayoutNoverlap()
  const nav = useNavigate()
  const activeNode = game.world?.nodes.find(
    (n) => n.id === game.world?.activeNodeId
  )

  function makeGraph() {
    const graph = new MultiDirectedGraph()
    if (game.world) {
      for (let node of game.world.nodes) {
        const isActive = activeNode?.id === node.id
        const isEdgeNode = activeNode?.edges.includes(node.id)
        graph.addNode(node.id, {
          label: isActive ? `${node.x},${node.y}` : '?',
          x: node.x,
          y: node.y,
          size: node.size,
          color: isActive ? 'yellow' : isEdgeNode ? 'blue' : 'grey',
          forceLabel: true,
          highlighted: true,
        })
      }

      for (let node of game.world.nodes) {
        const isActive = activeNode?.id === node.id

        for (let edge of node.edges) {
          if (edge !== activeNode?.id) {
            graph.addDirectedEdge(node.id, edge, {
              size: 2,
              color: isActive ? 'white' : '#333',
            })
          }
        }
      }
    }
    return graph
  }

  useEffect(() => {
    sigma.clear()
    const graph = makeGraph()
    loadGraph(graph)
    assign()
  }, [loadGraph, makeGraph])

  useEffect(() => {
    registerEvents({
      clickNode: (payload) => {
        const isEdgeNode = activeNode?.edges.includes(payload.node)
        const isActive = activeNode?.id === payload.node
        if (isEdgeNode || isActive) {
          const node = game.world?.nodes.find((n) => n.id === payload.node)
          if (node && node.isInteractable) {
            game.setActiveNodeId(node.id)
            encounter.updateEncounter(() => node.encounter)
            nav({ to: '/encounter' })
          }
        }
      },
    })
  }, [])

  return null
}

export function World() {
  const game = useGame()
  const nav = useNavigate()

  const sigmaSettings: Partial<Settings> = useMemo(
    () => ({
      allowInvalidContainer: true,
      nodeProgramClasses: {
        image: createNodeImageProgram({
          size: { mode: 'force', value: 256 },
        }),
      },
      defaultNodeType: 'image',
      defaultEdgeType: 'arrow',
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      zIndex: true,
    }),
    []
  )

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={
        <div>
          <TeamHeader team={game.team} />
        </div>
      }
    >
      {game.world && (
        <SigmaContainer
          settings={sigmaSettings}
          style={{ background: 'transparent', overflow: 'hidden' }}
        >
          <LoadGraph />
          <div style={{ position: 'absolute', top: 0 }}>
            <GraphResetButton />
          </div>
        </SigmaContainer>
      )}
    </PageLayout>
  )
}
