import { BuilderHeader } from '@/components/builder/BuilderHeader'
import { StartButton } from '@/components/builder/StartButton'
import { UnitBuilder } from '@/components/builder/UnitBuilder'
import { VantaContextProvider } from '@/hooks'
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
    <VantaContextProvider>
      <PageLayout
        navbar={<Navbar />}
        // aside={<BuilderSidebar />}
        header={<BuilderHeader />}
        className="overflow-auto"
      >
        <div className="flex flex-col flex-1 items-center p-8">
          <div>
            <div className="flex">
              <div className="flex flex-col items-start w-full p-12">
                <div className="text-7xl font-black">Welcome!</div>
                <div className="text-lg text-muted-foreground">
                  Change up your units if you want and then hit "Start!" to
                  begin.
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-12">
                <StartButton className="w-[280px]" />
              </div>
            </div>
            {ui.activeBuilderId && <UnitBuilder />}
          </div>
        </div>
      </PageLayout>
    </VantaContextProvider>
  )
}
