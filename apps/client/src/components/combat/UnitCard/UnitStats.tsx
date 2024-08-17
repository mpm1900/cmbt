import { Separator } from '@/components/ui/separator'
import { useCombatContext } from '@/hooks'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { StatDebug } from '../StatDebug'

export type UnitStatsProps = {
  unit: Unit
}

export function UnitStats(props: UnitStatsProps) {
  const ctx = useCombatContext()
  const { unit } = applyModifiers(props.unit, ctx)
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)

  return (
    <div>
      <div className="flex space-x-4">
        <div>
          <div className="text-center">Vitals</div>
          <div className="flex justify-between space-x-2">
            <strong>HP</strong>
            <span>
              ({remainingHealth}/{unit.stats.health})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>FP</strong>
            <span>
              ({Math.max(unit.values.focus, 0)}/{unit.stats.focus})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>SP</strong>
            <span>
              ({Math.max(unit.values.stamina, 0)}/{unit.stats.stamina})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>DV</strong>
            <span>
              ({Math.max(unit.values.devotion, 0)}/{unit.stats.devotion})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>M. Armor</strong>
            <span>{unit.values.magicArmor}</span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>P. Armor</strong>
            <span>{unit.values.physicalArmor}</span>
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div>
          <div className="text-center">Stats</div>
          <div className="flex justify-between space-x-2">
            <strong>Physical</strong>
            <StatDebug stat="physical" unit={unit} comp={props.unit} />
          </div>
          <div className="flex justify-between space-x-2">
            <strong>Defense</strong>
            <StatDebug stat="defense" unit={unit} comp={props.unit} />
          </div>
          <div className="flex justify-between space-x-2">
            <strong>Magic</strong>
            <StatDebug stat="magic" unit={unit} comp={props.unit} />
          </div>
          <div className="flex justify-between space-x-2">
            <strong>Speed</strong>
            <StatDebug stat="speed" unit={unit} comp={props.unit} />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between space-x-2">
            <strong>Accuracy Δ</strong>
            <StatDebug stat="accuracy" unit={unit} comp={props.unit} />
          </div>
          <div className="flex justify-between space-x-2">
            <strong>Crit % Δ</strong>
            <StatDebug stat="criticalChance" unit={unit} comp={props.unit} />
          </div>
          <div className="flex justify-between space-x-2">
            <strong>Crit Dmg Δ</strong>
            <StatDebug stat="criticalDamage" unit={unit} comp={props.unit} />
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="flex flex-col text-left flex-1">
          <div className="text-center">Damage</div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Arcane</strong>
            <StatDebug
              stat="arcaneExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Blunt</strong>
            <StatDebug
              stat="bluntExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Fire</strong>
            <StatDebug
              stat="fireExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Force</strong>
            <StatDebug
              stat="forceExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Shock</strong>
            <StatDebug
              stat="shockExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Slash</strong>
            <StatDebug
              stat="slashExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Thrust</strong>
            <StatDebug
              stat="thrustExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => (v + 1) * 100}
            />
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="flex flex-col text-left flex-1">
          <div className="text-center">Negation</div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Arcane</strong>
            <StatDebug
              stat="arcaneExpansion"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Blunt</strong>
            <StatDebug
              stat="bluntNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Fire</strong>
            <StatDebug
              stat="fireNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Force</strong>
            <StatDebug
              stat="forceNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Shock</strong>
            <StatDebug
              stat="shockNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Slash</strong>
            <StatDebug
              stat="slashNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <strong className="text-muted-foreground">Thrust</strong>
            <StatDebug
              stat="thrustNegation"
              unit={unit}
              comp={props.unit}
              map={(v) => v * 100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
