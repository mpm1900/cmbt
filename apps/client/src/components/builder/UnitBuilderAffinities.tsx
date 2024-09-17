import { useUnitBuilders } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { DamageIcon } from '@shared/DamageIcon'

export function UnitBuilderAffinities() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)
  if (!builder) return null

  return (
    <div>
      {builder.base.affinities.length > 0 && (
        <div className="flex space-x-4 justify-between">
          <div className="text-muted-foreground">Affinities</div>
          <div className="flex space-x-2">
            {builder.base.affinities.map((affinity, i) => (
              <div key={i} className="flex space-x-1">
                <DamageIcon damageType={affinity.type} />
                <div className="text-green-200 num">
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
                <div className="text-green-200 num">
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
                <div className="text-red-200 num">
                  {affinity.factor.toFixed()}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
