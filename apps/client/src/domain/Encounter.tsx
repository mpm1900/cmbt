import { EncounterHeader } from '@/components/encounter/EncounterHeader'
import { NodeRenderer } from '@/components/encounter/NodeRenderer'
import {
  useEncounterContext,
  useEncounterSetup,
  VantaContextProvider,
} from '@/hooks'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'

export function Encounter() {
  const ctx = useEncounterContext()
  const ready = useEncounterSetup()

  return (
    <VantaContextProvider>
      <PageLayout
        navbar={<Navbar />}
        // aside={<EncounterSidebar defaultValue="team" />}
        header={<EncounterHeader />}
      >
        <div className="flex flex-1 items-center justify-center">
          {ctx.activeNode && ready && <NodeRenderer node={ctx.activeNode} />}
        </div>
      </PageLayout>
    </VantaContextProvider>
  )
}
