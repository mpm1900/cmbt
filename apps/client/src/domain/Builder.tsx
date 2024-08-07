import { ActiveUnit } from '@/components/builder/ActiveUnit'
import { UnitSelectButton } from '@/components/builder/UnitSelectButton'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAX_UNITS_PER_TEAM } from '@/constants'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { useInitializeCombat } from '@/hooks/useInitializeCombat'
import { makeBuilder } from '@/utils/makeUnitBuilder'
import { useEffect } from 'react'

export function Builder() {
  const init = useInitializeCombat()
  const store = useUnitBuilders()
  const ui = useBuilderUi()
  const _builders = Array.from({ length: MAX_UNITS_PER_TEAM })

  useEffect(() => {
    ui.setActiveBuilderId(store.builders[0].id)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="flex flex-col items-center">
        <div className="flex flex-1 p-4 space-x-4">
          <Tabs defaultValue="account w-full">
            <TabsList className="">
              {_builders.map((_, i) => (
                <UnitSelectButton
                  key={i}
                  builder={store.builders[i]}
                  onAddClick={() => {
                    const builder = makeBuilder()
                    store.addBuilder(builder)
                    ui.setActiveBuilderId(builder.id)
                  }}
                  onUnitClick={() => {
                    ui.setActiveBuilderId(store.builders[i]?.id)
                  }}
                />
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="destructive"
            disabled={store.builders.length < 2}
            onClick={() => init(store.builders)}
          >
            Initialize Combat
          </Button>
        </div>
      </div>
      {ui.activeBuilderId && <ActiveUnit />}
    </div>
  )
}
