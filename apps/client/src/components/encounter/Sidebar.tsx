import { useScrollToView } from '@/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export function Sidebar() {
  return (
    <div className="w-[420px] bg-slate-950 h-screen flex overflow-hidden">
      <Tabs defaultValue="team" className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full">
          <div className="p-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="log">Encounter Log</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 overflow-auto w-full">
            <TabsContent value="team">team</TabsContent>
            <TabsContent value="log">log</TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
