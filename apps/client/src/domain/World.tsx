import { GraphResetButton } from '@/components/world/GraphResetButton'
import { WorldGraph } from '@/components/world/WorldGraph'
import { useGame } from '@/hooks/state'
import { SigmaContainer } from '@react-sigma/core'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
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
      defaultNodeType: 'pictogram',
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      zIndex: true,
      /*
      edgeReducer: (_, attr) => {
        console.log('pre', attr.color)
        attr.color = chroma(attr.color).alpha(0.25).hex()

        console.log('post', attr.color)
        return attr
      },
      */
    }
  }, [])

  return (
    <PageLayout
      navbar={<Navbar />}
      //aside={<EncounterSidebar />}
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
          <WorldGraph />
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <GraphResetButton />
          </div>
        </SigmaContainer>
      )}
    </PageLayout>
  )
}
