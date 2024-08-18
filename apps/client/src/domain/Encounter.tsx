import { EncounterSidebar } from '@/components/encounter/EncounterSidebar'
import { NodeRenderer } from '@/components/encounter/NodeRenderer'
import { useEncounterContext, useEncounterSetup } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'

export function Encounter() {
  const ctx = useEncounterContext()
  const game = useGame()
  useEncounterSetup()

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar defaultValue="team" />}
      header={<TeamHeader team={game.team} />}
    >
      <div className="flex flex-1 items-center justify-center">
        {ctx.activeNode && <NodeRenderer node={ctx.activeNode} />}
      </div>
    </PageLayout>
  )
}
