import { Unit } from '@repo/game/types'
import {
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar'
import { SidebarUnit } from './SidebarUnit'

export type UnitsMenuProps = {
  units: Unit[]
}

export function UnitsMenu(props: UnitsMenuProps) {
  const { units } = props

  return (
    <MenubarMenu>
      <MenubarTrigger>Units</MenubarTrigger>
      <MenubarContent className="min-w-[320px]">
        {units.map((unit, i) => (
          <>
            {i !== 0 && <MenubarSeparator />}
            <SidebarUnit unit={unit} />
          </>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}
