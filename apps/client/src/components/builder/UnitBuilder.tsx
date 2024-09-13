import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { BASE_CONFIGS } from '@repo/game/data'
import { DamageIcon } from '@shared/DamageIcon'
import { FaRegSquareFull, FaSquare } from 'react-icons/fa6'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { ActionsTable } from './ActionsTable'
import { UnitAbilitySelect } from './UnitAbilitySelect'
import { UnitBaseSelect } from './UnitBaseSelect'
import { UnitBaseStats } from './UnitBaseStats'

export function UnitBuilder() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)

  return (
    <div className="flex space-y-4 lg:space-y-0 lg:space-x-4 items-start justify-center flex-col lg:flex-row">
      {builder && (
        <Card className="w-full lg:w-[360px]">
          <CardHeader>
            <div>
              <CardTitle>{builder.name}</CardTitle>
              <CardDescription>Set unit details</CardDescription>
            </div>
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
              <Separator />
              <UnitBaseStats base={builder.base} />
              <Separator />
              <div>
                {builder.base.affinities.length > 0 && (
                  <div className="flex space-x-4 justify-between">
                    <div className="text-muted-foreground">Affinities</div>
                    <div className="flex space-x-2">
                      {builder.base.affinities.map((affinity, i) => (
                        <div key={i} className="flex space-x-1">
                          <DamageIcon damageType={affinity.type} />
                          <div className="text-green-200">
                            {affinity.factor.toFixed()}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {builder.base.resistances.length > 0 && (
                  <div className="flex space-x-4 justify-between">
                    <div className="text-muted-foreground">Resistances</div>
                    <div className="flex space-x-2">
                      {builder.base.resistances.map((affinity, i) => (
                        <div key={i} className="flex space-x-1">
                          <DamageIcon damageType={affinity.type} />
                          <div className="text-green-200">
                            {affinity.factor.toFixed()}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {builder.base.weaknesses.length > 0 && (
                  <div className="flex space-x-4 justify-between">
                    <div className="text-muted-foreground"> Weaknesses</div>
                    <div className="flex space-x-2">
                      {builder.base.weaknesses.map((affinity, i) => (
                        <div key={i} className="flex space-x-1">
                          <DamageIcon damageType={affinity.type} />
                          <div className="text-red-200">
                            {affinity.factor.toFixed()}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {builder && (
        <Card className="w-full lg:w-[680px]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Select up to {builder.config.actionsCount} actions.
                </CardDescription>
              </div>
              <div className="flex space-x-1 justify-center">
                {Array.from({ length: builder.config.actionsCount }).map(
                  (_, i) =>
                    builder.actions.length >= i + 1 ? (
                      <FaSquare key={i} className="fill-muted-foreground" />
                    ) : (
                      <FaRegSquareFull
                        key={i}
                        className="fill-muted-foreground"
                      />
                    )
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ActionsTable builder={builder} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
