import { EncounterSidebar } from '@/components/_shared/EncounterSidebar'
import { NodeRenderer } from '@/components/encounter/NodeRenderer'
import { useEncounterContext } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { TeamHeader } from '@shared/TeamHeader'
import { useNavigate } from '@tanstack/react-router'

export function Encounter() {
  const ctx = useEncounterContext()
  const game = useGame()
  const nav = useNavigate()
  if (!game.team.id) nav({ to: '/' })

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar defaultValue="log" />}
      header={<TeamHeader team={game.team} />}
    >
      <div className="flex flex-1 items-center justify-center">
        {ctx.activeNode && <NodeRenderer node={ctx.activeNode} />}
      </div>
    </PageLayout>
  )
}
