import { useGame } from '@/hooks/state'
import { groupItemsById } from '@/utils'
import { ZERO_UNIT } from '@repo/game/data'
import { ItemListTable } from '@shared/ItemListTable'
import { MenuUnit } from '../_shared/MenuUnit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { WorldLegend } from './WorldLegend'

export type WorldSidebarProps = {
  defaultValue?: string
}

export function WorldSidebar(props: WorldSidebarProps) {
  const { defaultValue = 'team' } = props
  const game = useGame()
  const groupedItems = groupItemsById(game.team.items)

  return (
    <div className="w-[420px] h-full bg-slate-950 border-l flex overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="legend">Legend</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-auto w-full">
          <TabsContent value="team" className="px-2 my-0 space-y-2">
            <div className="flex justify-center text-muted-foreground">
              Click units to edit
            </div>
            {game.units.map((unit) => (
              <MenuUnit key={unit.id} unit={unit} />
            ))}
          </TabsContent>
          <TabsContent value="items">
            <div className="px-4">
              <ItemListTable
                unit={ZERO_UNIT}
                items={groupedItems}
                costMultiplier={1}
                quantities={Object.fromEntries(
                  groupedItems.map((i) => [i.id, i.count])
                )}
                resources={{ credits: 0 }}
              />
            </div>
          </TabsContent>
          <TabsContent value="legend">
            <div className="px-4">
              <WorldLegend />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
