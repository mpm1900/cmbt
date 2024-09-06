import { Unit } from '@repo/game/types'
import { Fragment } from 'react/jsx-runtime'
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
          <Fragment key={unit.id}>
            {i !== 0 && <MenubarSeparator />}
            <SidebarUnit unit={unit} />
          </Fragment>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}
