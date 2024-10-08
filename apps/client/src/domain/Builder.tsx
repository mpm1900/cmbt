import { BuilderHeader } from '@/components/builder/BuilderHeader'
import { StartButton } from '@/components/builder/StartButton'
import { UnitBuilder } from '@/components/builder/UnitBuilder'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        <div className="flex flex-col flex-1 items-center p-8 pt-0">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex flex-col items-start w-full p-12 pb-2 space-y-4">
                <div className="text-7xl font-black">Who are you?</div>
                <div className="text-lg text-muted-foreground">
                  Change up your party if you want and then hit "Start!" to
                  begin your journey.
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-12">
                <StartButton className="w-[280px]" />
              </div>
            </div>
            <div className="flex justify-center">
              <Tabs
                value={ui.activeBuilderId}
                onValueChange={(id) => ui.setActiveBuilderId(id)}
              >
                <TabsList className="h-full">
                  {store.builders.map((b) => (
                    <TabsTrigger
                      key={b.id}
                      value={b.id}
                      className="flex-col items-start min-w-[120px]"
                    >
                      <div>{b.name}</div>
                      <div className="text-xs text-muted-foreground/40">
                        {b.base.name}
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            {ui.activeBuilderId && <UnitBuilder />}
          </div>
        </div>
      </PageLayout>
    </VantaContextProvider>
  )
}
