import { Separator } from '@/components/ui/separator'
import { useCombatContext } from '@/hooks'
import { DamageRenderers } from '@/renderers/Damage'
import { StatRenderers } from '@/renderers/Stats'
import { DamageType, StatKey, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { ReactNode } from '@tanstack/react-router'
import { MagicArmor } from './MagicArmor'
import { PhysicalArmor } from './PhysicalArmor'
import { StatDebug } from './StatDebug'

type UnitStatProps = {
  unit: Unit
  comp: Unit
  stat: StatKey
  before?: ReactNode
  after?: ReactNode
  map?: (value: number) => number
}

function UnitStat(props: UnitStatProps) {
  const { unit, comp, stat, before, after, map } = props
  return (
    <div className="flex justify-between space-x-2">
      <div className="flex items-center space-x-1">
        {StatRenderers[stat]?.icon}
        <span className="text-muted-foreground font-bold whitespace-nowrap">
          {StatRenderers[stat]?.name ?? stat}
        </span>
      </div>
      <span>
        {before}
        <StatDebug stat={stat} unit={unit} comp={comp} map={map} />
        {after}
      </span>
    </div>
  )
}

type UnitDamageStatProps = UnitStatProps & { damageType: DamageType }
function UnitDamageStat(props: UnitDamageStatProps) {
  return (
    <div className="flex space-x-4 justify-between">
      <div className="flex items-center space-x-1">
        {DamageRenderers[props.damageType]?.icon}
        <strong className="text-muted-foreground">
          {DamageRenderers[props.damageType]?.name}
        </strong>
      </div>
      <span>
        {props.before}
        <StatDebug
          stat={props.stat}
          unit={props.unit}
          comp={props.comp}
          map={props.map}
        />
        {props.after}
      </span>
    </div>
  )
}

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
        <div className="space-y-4">
          <div>
            <div className="text-center font-black text-muted-foreground/60 uppercase text-sm">
              Stats
            </div>
            <Separator className="my-1" />
            <UnitStat unit={unit} comp={props.unit} stat="physical" />
            <UnitStat unit={unit} comp={props.unit} stat="defense" />
            <UnitStat unit={unit} comp={props.unit} stat="magic" />
            <UnitStat unit={unit} comp={props.unit} stat="speed" />

            <Separator className="my-2" />
            <div className="space-y-2">
              <div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">HP</strong>
                  <span className="font-mono">
                    ({remainingHealth}/{unit.stats.health})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">FP</strong>
                  <span className="font-mono">
                    ({Math.max(unit.values.focus, 0)}/{unit.stats.focus})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">SP</strong>
                  <span className="font-mono">
                    ({Math.max(unit.values.stamina, 0)}/{unit.stats.stamina})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">DV</strong>
                  <span className="font-mono">
                    ({Math.max(unit.values.devotion, 0)}/{unit.stats.devotion})
                  </span>
                </div>
              </div>

              <div className="flex justify-around">
                <MagicArmor className="px-2">
                  <span>{unit.values.magicArmor}</span>
                </MagicArmor>

                <PhysicalArmor className="px-2">
                  <span>{unit.values.physicalArmor}</span>
                </PhysicalArmor>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="flex flex-col text-left flex-1">
          <div className="text-center font-black text-muted-foreground/60 uppercase text-sm">
            Damage
          </div>
          <Separator className="my-1" />
          <UnitDamageStat
            stat="arcaneExpansion"
            unit={unit}
            comp={props.unit}
            damageType="arcane"
            map={(v) => (v + 1) * 100}
            after="%"
          />
          <UnitDamageStat
            stat="fireExpansion"
            unit={unit}
            comp={props.unit}
            damageType="fire"
            map={(v) => (v + 1) * 100}
            after="%"
          />
          <UnitDamageStat
            stat="forceExpansion"
            unit={unit}
            comp={props.unit}
            damageType="force"
            map={(v) => (v + 1) * 100}
            after="%"
          />
          <UnitDamageStat
            stat="psychicExpansion"
            unit={unit}
            comp={props.unit}
            damageType="psychic"
            map={(v) => (v + 1) * 100}
            after="%"
          />
          <UnitDamageStat
            stat="shockExpansion"
            unit={unit}
            comp={props.unit}
            damageType="shock"
            map={(v) => (v + 1) * 100}
            after="%"
          />
          <Separator className="my-2" />
          <UnitStat
            stat="accuracy"
            unit={unit}
            comp={props.unit}
            before="+"
            after="%"
          />
          <UnitStat
            stat="criticalChance"
            unit={unit}
            comp={props.unit}
            before="+"
            after="%"
          />
          <UnitStat
            stat="criticalDamage"
            unit={unit}
            comp={props.unit}
            before="+"
          />
        </div>
        <div className="w-[1px] bg-border" />
        <div className="flex flex-col text-left flex-1">
          <div className="text-center font-black text-muted-foreground/60 uppercase text-sm">
            Negation
          </div>
          <Separator className="my-1" />
          <UnitDamageStat
            stat="arcaneNegation"
            unit={unit}
            comp={props.unit}
            damageType="arcane"
            map={(v) => v * 100}
            after="%"
          />
          <UnitDamageStat
            stat="fireNegation"
            unit={unit}
            comp={props.unit}
            damageType="fire"
            map={(v) => v * 100}
            after="%"
          />
          <UnitDamageStat
            stat="forceNegation"
            unit={unit}
            comp={props.unit}
            damageType="force"
            map={(v) => v * 100}
            after="%"
          />
          <UnitDamageStat
            stat="psychicNegation"
            unit={unit}
            comp={props.unit}
            damageType="psychic"
            map={(v) => v * 100}
            after="%"
          />
          <UnitDamageStat
            stat="shockNegation"
            unit={unit}
            comp={props.unit}
            damageType="shock"
            map={(v) => v * 100}
            after="%"
          />
          <Separator className="my-2" />
          <UnitStat unit={unit} comp={props.unit} stat="evasion" after="%" />
        </div>
      </div>
    </div>
  )
}
