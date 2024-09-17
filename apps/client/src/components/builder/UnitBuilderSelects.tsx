import { useUnitBuilders } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { BASE_CONFIGS } from '@repo/game/data'
import { Label } from '../ui/label'
import { UnitAbilitySelect } from './UnitAbilitySelect'
import { UnitBaseSelect } from './UnitBaseSelect'

export function UnitBuilderSelects() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)
  if (!builder) return null
  return (
    <div>
      <div>
        <Label htmlFor="base" className="min-w-[86px] text-muted-foreground">
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

      <div>
        <Label htmlFor="name" className="min-w-[86px] text-muted-foreground">
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
  )
}
