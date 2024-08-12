import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CombatLog } from './CombatLog'
import { CombatSettings } from './CombatSettings'

export function Sidebar() {
  return (
    <div className="w-[420px] bg-slate-950 h-screen flex overflow-hidden border-l">
      <Tabs defaultValue="log" className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full">
          <div className="p-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="log">Combat Log</TabsTrigger>
              <TabsTrigger value="mods">Settings</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 overflow-auto w-full">
            <TabsContent value="log">
              <CombatLog />
            </TabsContent>
            <TabsContent value="mods">
              <CombatSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
