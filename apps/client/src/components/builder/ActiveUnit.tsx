import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { UnitBaseSelect } from './UnitBaseSelect'
import { UnitBaseStats } from './UnitBaseStats'
import { BASE_CONFIGS, ZERO_UNIT } from '@repo/game/data'
import { ActionsTable } from './ActionsTable'
import { UnitAbilitySelect } from './UnitAbilitySelect'

export function ActiveUnit() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)

  return (
    <div className="flex space-x-4 justify-center">
      {builder && (
        <div>
          <Card className="w-[320px]">
            <CardHeader>
              <CardTitle>Unit</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="name" className="min-w-[72px]">
                    Name
                  </Label>
                  <Input
                    value={builder.name}
                    onChange={(e) => {
                      const name = e.target.value
                      if (name) {
                        store.updateBuilder(builder.id, (b) => ({
                          name,
                        }))
                      }
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="base" className="min-w-[72px]">
                    Class
                  </Label>
                  <UnitBaseSelect
                    value={builder.base}
                    onChange={(base) => {
                      const config = BASE_CONFIGS[base.id]
                      store.updateBuilder(builder.id, (b) => ({
                        base,
                        config,
                        actions: config.actions.filter((m) =>
                          config.defaultActionIds.includes(m.id)
                        ),
                      }))
                    }}
                  />
                </div>
                <UnitBaseStats base={builder.base} />
                <div className="flex items-center space-x-2">
                  <Label htmlFor="name" className="min-w-[72px]">
                    Ability
                  </Label>
                  <UnitAbilitySelect
                    options={builder.config.abilities}
                    value={builder.ability}
                    onChnage={(ability) =>
                      store.updateBuilder(builder.id, (b) => ({
                        ability,
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {builder && (
        <div className="w-[600px]">
          <Card>
            <CardHeader>
              <CardTitle>Actions ({builder.config.actionsCount})</CardTitle>
            </CardHeader>
            <CardContent>
              <ActionsTable builder={builder} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
