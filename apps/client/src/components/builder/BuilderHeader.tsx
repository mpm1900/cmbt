import { useUnitBuilders } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { AUGMENT_NAMES } from '@/renderers'
import { BeastiaryMenu } from '@shared/BeastiaryMenu'
import { PageHeader } from '@shared/PageHeader'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '../ui/menubar'

export function BuilderHeader() {
  const store = useUnitBuilders()
  const ui = useBuilderUi()

  return (
    <PageHeader>
      <div className="flex flex-1 items-center px-1">
        <Menubar className="border-0">
          <MenubarMenu>
            <MenubarTrigger>Units</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup
                value={ui.activeBuilderId}
                onValueChange={(id) => ui.setActiveBuilderId(id)}
              >
                {store.builders.map((builder) => {
                  const name = AUGMENT_NAMES[builder.ability?.id ?? '']
                  return (
                    <MenubarRadioItem
                      key={builder.id}
                      value={builder.id}
                      className="cursor-pointer"
                    >
                      <div>
                        <div className="font-bold">{builder.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {builder.base.name}{' '}
                          {builder.ability && (
                            <span className="opacity-40">({name})</span>
                          )}
                        </div>
                      </div>
                    </MenubarRadioItem>
                  )
                })}
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <BeastiaryMenu />
      </div>
    </PageHeader>
  )
}
