import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CombatLog } from './CombatLog'
import { CombatSettings } from './CombatSettings'

export function Sidebar() {
  return (
    <div className="w-[420px] h-full bg-slate-950 flex border-l overflow-auto">
      <Tabs defaultValue="log" className="flex flex-1">
        <div className="flex flex-col w-full">
          <div className="p-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="log">Combat Log</TabsTrigger>
              <TabsTrigger value="mods">Settings</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-1 overflow-auto w-full h-full">
            <TabsContent value="log">
              <CombatLog />
            </TabsContent>
            <TabsContent value="mods" className="w-full">
              <CombatSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
