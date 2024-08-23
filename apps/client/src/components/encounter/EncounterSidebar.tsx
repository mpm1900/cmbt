import { useGame } from '@/hooks/state'
import { groupItemsById } from '@/utils'
import { ZERO_UNIT } from '@repo/game/data'
import { ItemListTable } from '@shared/ItemListTable'
import { SidebarUnit } from '../_shared/SidebarUnit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export type EncounterSidebarProps = {
  defaultValue?: string
}

export function EncounterSidebar(props: EncounterSidebarProps) {
  const { defaultValue = 'team' } = props
  const game = useGame()
  const groupedItems = groupItemsById(game.team.items)

  return (
    <div className="w-[420px] bg-slate-950 border-l h-screen flex overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-auto w-full">
          <TabsContent value="team" className="px-2 my-0 space-y-2">
            {game.units.map((unit) => (
              <SidebarUnit key={unit.id} unit={unit} />
            ))}
          </TabsContent>
          <TabsContent value="items">
            <div className="p-2">
              <ItemListTable
                unit={ZERO_UNIT}
                items={groupedItems}
                quantities={Object.fromEntries(
                  groupedItems.map((i) => [i.id, i.count])
                )}
                resources={{ credits: 0 }}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
