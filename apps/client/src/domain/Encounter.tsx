import { NodeRenderer } from '@/components/encounter/NodeRenderer'
import { Sidebar } from '@/components/encounter/Sidebar'
import { useEncounterContext } from '@/hooks'
import { Navbar } from '@shared/Navbar'

export function Encounter() {
  const ctx = useEncounterContext()

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <NodeRenderer node={ctx.activeNode} />
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
