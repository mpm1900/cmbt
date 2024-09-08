import { useCy, useGame } from '@/hooks/state'
import { Counter } from '@shared/Counter'
import { ItemsMenu } from '@shared/ItemsMenu'
import { PageHeader } from '@shared/PageHeader'
import { UnitsMenu } from '@shared/UnitsMenu'
import { GiCreditsCurrency } from 'react-icons/gi'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar'
import { WorldLegend } from './WorldLegend'

export function WorldHeader() {
  const game = useGame()
  const { cy, fitAll, fitActive, centerActive } = useCy()
  const credits = game.team.resources.credits ?? 0

  return (
    <PageHeader>
      <div className="flex flex-1 justify-between">
        <Menubar className="border-0">
          <UnitsMenu units={game.units} />
          <ItemsMenu items={game.team.items} />
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            {cy && (
              <MenubarContent>
                <MenubarItem onClick={() => fitAll(cy)}>Zoom Out</MenubarItem>
                <MenubarItem onClick={() => centerActive(cy)}>
                  Center
                </MenubarItem>
                <MenubarItem onClick={() => fitActive(cy)}>Reset</MenubarItem>
              </MenubarContent>
            )}
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Legend</MenubarTrigger>
            <MenubarContent className="px-4">
              <WorldLegend />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="flex items-center space-x-1 px-4">
          <Counter
            from={game.team.resources.credits}
            to={credits}
            duration={0.5}
          />
          <GiCreditsCurrency />
        </div>
      </div>
    </PageHeader>
  )
}
