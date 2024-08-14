import { WorldGraph } from '@/components/world/WorldGraphSigma'
import { useGame } from '@/hooks/state'
import { SigmaContainer } from '@react-sigma/core'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import EdgeCurveProgram from '@sigma/edge-curve'
import { createNodeImageProgram } from '@sigma/node-image'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { NodeCircleProgram, createNodeCompoundProgram } from 'sigma/rendering'
import { Settings } from 'sigma/settings'

export function World() {
  const game = useGame()
  const nav = useNavigate()

  if (!game.team.id) {
    nav({ to: '/' })
  }

  const sigmaSettings: Partial<Settings> = useMemo(() => {
    const NodePictogramCustomProgram = createNodeImageProgram({
      padding: 0.15,
      size: { mode: 'force', value: 256 },
      drawingMode: 'color',
      colorAttribute: 'pictoColor',
    })

    const NodeProgram = createNodeCompoundProgram([
      NodeCircleProgram,
      NodePictogramCustomProgram,
    ])

    return {
      allowInvalidContainer: true,
      nodeProgramClasses: {
        pictogram: NodeProgram,
      },
      edgeProgramClasses: {
        curved: EdgeCurveProgram,
      },
      defaultNodeType: 'pictogram',
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      enableEdgeEvents: true,
      zIndex: true,
    }
  }, [])

  return (
    <PageLayout
      navbar={<Navbar />}
      //aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      {game.world && (
        <SigmaContainer
          settings={sigmaSettings}
          style={{ background: 'transparent', overflow: 'hidden' }}
        >
          <WorldGraph />
        </SigmaContainer>
      )}
    </PageLayout>
  )
}
