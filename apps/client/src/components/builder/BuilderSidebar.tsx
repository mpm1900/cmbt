import { useUnitBuilders } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export type BuilderSidebarProps = {
  defaultValue?: string
}

export function BuilderSidebar(props: BuilderSidebarProps) {
  const { defaultValue = 'team' } = props
  const store = useUnitBuilders()
  const ui = useBuilderUi()

  return (
    <div className="w-[420px] bg-slate-950 border-l h-screen flex flex-col overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-auto w-full">
          <TabsContent
            value="team"
            className="p-4 my-0 space-y-2 flex flex-col"
          >
            {store.builders.map((builder) => (
              <Button
                variant={
                  ui.activeBuilderId === builder.id ? 'default' : 'ghost'
                }
                className="flex flex-col justify-start items-start h-full"
                key={builder.id}
                onClick={() => {
                  ui.setActiveBuilderId(builder.id)
                }}
              >
                <div>{builder.name}</div>
                <div className="text-xs opacity-40">{builder.base.name}</div>
              </Button>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
