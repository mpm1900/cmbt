import { useScrollToBottom } from '@/hooks'
import { useCombatLog } from '@/hooks/state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useCombat } from '@/hooks/state/useCombat'

export function Sidebar() {
  const store = useCombatLog()
  const combat = useCombat()
  const ref = useScrollToBottom(store.logs.length)
  return (
    <div className="w-[360px] bg-slate-950 h-screen flex" ref={ref}>
      <Tabs defaultValue="log" className="flex flex-1">
        <div className="flex flex-col w-full">
          <div className="p-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="log">Action Log</TabsTrigger>
              <TabsTrigger value="mods">Modifiers</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 overflow-auto w-full">
            <TabsContent value="log">
              <div className="overflow-auto">
                {store.logs.map((log, i) => (
                  <div key={i} className="px-2 py-0.5 overflow-hidden">
                    {log}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="mods">
              {combat.modifiers.map((mod) => (
                <pre key={mod.rtid}>{JSON.stringify(mod)}</pre>
              ))}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
