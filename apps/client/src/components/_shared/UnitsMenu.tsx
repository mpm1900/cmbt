import { Unit } from '@repo/game/types'
import { Fragment } from 'react/jsx-runtime'
import {
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar'
import { MenuUnit } from './MenuUnit'

export type UnitsMenuProps = {
  units: Unit[]
}

export function UnitsMenu(props: UnitsMenuProps) {
  const { units } = props

  return (
    <MenubarMenu>
      <MenubarTrigger>Units</MenubarTrigger>
      <MenubarContent className="min-w-[320px] space-y-1">
        {units.map((unit, i) => (
          <Fragment key={unit.id}>
            {i !== 0 && <MenubarSeparator />}
            <MenuUnit unit={unit} />
          </Fragment>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}
