import { UnitBase } from '@repo/game/types'
import { DamageIcon } from '@shared/DamageIcon'

export type UnitBuilderAffinitiesProps = {
  base: UnitBase
}

export function UnitBaseAffinities(props: UnitBuilderAffinitiesProps) {
  const { base } = props

  return (
    <div>
      {base.affinities.length > 0 && (
        <div className="flex space-x-4 justify-between">
          <div className="text-muted-foreground">Affinities</div>
          <div className="flex space-x-2">
            {base.affinities.map((affinity, i) => (
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
      {base.resistances.length > 0 && (
        <div className="flex space-x-4 justify-between">
          <div className="text-muted-foreground">Resistances</div>
          <div className="flex space-x-2">
            {base.resistances.map((affinity, i) => (
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
      {base.weaknesses.length > 0 && (
        <div className="flex space-x-4 justify-between">
          <div className="text-muted-foreground"> Weaknesses</div>
          <div className="flex space-x-2">
            {base.weaknesses.map((affinity, i) => (
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
