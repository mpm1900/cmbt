import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { BASE_CONFIGS } from '@repo/game/data'
import { DamageIcon } from '@shared/DamageIcon'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ActionsTable } from './ActionsTable'
import { UnitAbilitySelect } from './UnitAbilitySelect'
import { UnitBaseSelect } from './UnitBaseSelect'
import { UnitBaseStats } from './UnitBaseStats'

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
              <CardTitle>{builder.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="name" className="min-w-[86px]">
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
                  <Label htmlFor="base" className="min-w-[86px]">
                    Class
                  </Label>
                  <UnitBaseSelect
                    value={builder.base}
                    onChange={(base) => {
                      const config = BASE_CONFIGS[base.id]
                      store.updateBuilder(builder.id, (b) => ({
                        base,
                        config,
                        ability: config.abilities.find(
                          (a) => a.id === config.defaultAbilityId
                        ),
                        actions: config.actions.filter((m) =>
                          config.defaultActionIds.includes(m.id)
                        ),
                      }))
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="name" className="min-w-[86px]">
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
                <UnitBaseStats base={builder.base} />
                {builder.base.affinities.length > 0 && (
                  <div className="flex space-x-2 justify-between">
                    <div>Affinities</div>
                    {builder.base.affinities.map((affinity) => (
                      <div className="flex space-x-1">
                        <DamageIcon damageType={affinity.type} />
                        <div className="text-green-200">
                          {affinity.factor * 100}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {builder.base.resistances.length > 0 && (
                  <div className="flex space-x-2 justify-between">
                    <div>Resistances</div>
                    {builder.base.resistances.map((affinity) => (
                      <div className="flex space-x-1">
                        <DamageIcon damageType={affinity.type} />
                        <div className="text-green-200">
                          {affinity.factor * 100}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {builder.base.weaknesses.length > 0 && (
                  <div className="flex space-x-2 justify-between">
                    <div>Weaknesses</div>
                    {builder.base.weaknesses.map((affinity) => (
                      <div className="flex space-x-1">
                        <DamageIcon damageType={affinity.type} />
                        <div className="text-red-200">
                          {affinity.factor * 100}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {builder && (
        <div className="w-[680px]">
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
