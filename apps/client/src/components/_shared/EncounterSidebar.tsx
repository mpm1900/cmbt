import { useGame } from '@/hooks/state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { SidebarUnit } from './SidebarUnit'

export type EncounterSidebarProps = {
  defaultValue?: string
}

export function EncounterSidebar(props: EncounterSidebarProps) {
  const { defaultValue = 'team' } = props
  const game = useGame()
  return (
    <div className="w-[420px] bg-slate-950 border-l h-screen flex overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="log">Encounter Log</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-auto w-full">
          <TabsContent value="team" className="px-4 my-0 space-y-2">
            {game.units.map((unit) => (
              <SidebarUnit key={unit.id} unit={unit} />
            ))}
          </TabsContent>
          <TabsContent value="log">log</TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
