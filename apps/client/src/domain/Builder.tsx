import { ActiveUnit } from '@/components/builder/ActiveUnit'
import { BuilderSidebar } from '@/components/builder/BuilderSidebar'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { useEffect } from 'react'

export function Builder() {
  const store = useUnitBuilders()
  const ui = useBuilderUi()

  useEffect(() => {
    ui.setActiveBuilderId(store.builders[0].id)
  }, [])

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<BuilderSidebar />}
      header={<div className="h-[42px] bg-slate-950 border-b" />}
    >
      <div className="flex flex-1 justify-center p-8">
        {ui.activeBuilderId && <ActiveUnit />}
      </div>
    </PageLayout>
  )
}
