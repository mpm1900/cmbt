import { NodeRenderer } from '@/components/encounter/NodeRenderer'
import { Sidebar } from '@/components/_shared/Sidebar'
import { useEncounterContext } from '@/hooks'
import { useGame } from '@/hooks/state'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'

export function Encounter() {
  const ctx = useEncounterContext()
  const game = useGame()

  return (
    <PageLayout navbar={<Navbar />} aside={<Sidebar />}>
      <div className="flex flex-1 items-center justify-center">
        <NodeRenderer node={ctx.activeNode} />
      </div>
    </PageLayout>
  )
}
