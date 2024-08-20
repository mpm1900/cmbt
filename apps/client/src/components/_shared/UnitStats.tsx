import { Separator } from '@/components/ui/separator'
import { useCombatContext } from '@/hooks'
import { DamageRenderers } from '@/renderers/Damage'
import { StatRenderers } from '@/renderers/Stats'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { MagicArmor } from './MagicArmor'
import { PhysicalArmor } from './PhysicalArmor'
import { StatDebug } from './StatDebug'

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
            <div className="flex justify-between space-x-2">
              <div className="flex items-center space-x-1">
                {StatRenderers.physical?.icon}
                <strong className="text-muted-foreground">Physical</strong>
              </div>
              <StatDebug stat="physical" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="flex items-center space-x-1">
                {StatRenderers.defense?.icon}
                <strong className="text-muted-foreground">Defense</strong>
              </div>
              <StatDebug stat="defense" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="flex items-center space-x-1">
                {StatRenderers.magic?.icon}
                <strong className="text-muted-foreground">Magic</strong>
              </div>
              <StatDebug stat="magic" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="flex items-center space-x-1">
                {StatRenderers.speed?.icon}
                <strong className="text-muted-foreground">Speed</strong>
              </div>
              <StatDebug stat="speed" unit={unit} comp={props.unit} />
            </div>

            <Separator className="my-2" />
            <div className="space-y-2">
              <div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">HP</strong>
                  <span>
                    ({remainingHealth}/{unit.stats.health})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">FP</strong>
                  <span>
                    ({Math.max(unit.values.focus, 0)}/{unit.stats.focus})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">SP</strong>
                  <span>
                    ({Math.max(unit.values.stamina, 0)}/{unit.stats.stamina})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">DV</strong>
                  <span>
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
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.arcane?.icon}
              <strong className="text-muted-foreground">Arcane</strong>
            </div>
            <span>
              <StatDebug
                stat="arcaneExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.fire?.icon}
              <strong className="text-muted-foreground">Fire</strong>
            </div>
            <span>
              <StatDebug
                stat="fireExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.force?.icon}
              <strong className="text-muted-foreground">Force</strong>
            </div>
            <span>
              <StatDebug
                stat="forceExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.psychic?.icon}
              <strong className="text-muted-foreground">Psychic</strong>
            </div>
            <span>
              <StatDebug
                stat="psychicExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.shock?.icon}
              <strong className="text-muted-foreground">Shock</strong>
            </div>
            <span>
              <StatDebug
                stat="shockExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
              %
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-1">
              {StatRenderers.accuracy?.icon}
              <strong className="text-muted-foreground">Accuracy</strong>
            </div>
            <span>
              <StatDebug stat="accuracy" unit={unit} comp={props.unit} />%
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-1">
              {StatRenderers.criticalChance?.icon}
              <strong className="text-muted-foreground">Crit % Δ</strong>
            </div>
            <span>
              <StatDebug stat="criticalChance" unit={unit} comp={props.unit} />%
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-1">
              {StatRenderers.criticalDamage?.icon}
              <strong className="text-muted-foreground">Crit Dmg Δ</strong>
            </div>
            <StatDebug stat="criticalDamage" unit={unit} comp={props.unit} />
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="flex flex-col text-left flex-1">
          <div className="text-center font-black text-muted-foreground/60 uppercase text-sm">
            Negation
          </div>
          <Separator className="my-1" />
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.arcane?.icon}
              <strong className="text-muted-foreground">Arcane</strong>
            </div>
            <span>
              <StatDebug
                stat="arcaneExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.fire?.icon}
              <strong className="text-muted-foreground">Fire</strong>
            </div>
            <span>
              <StatDebug
                stat="fireNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.force?.icon}
              <strong className="text-muted-foreground">Force</strong>
            </div>
            <span>
              <StatDebug
                stat="forceNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.psychic?.icon}
              <strong className="text-muted-foreground">Psychic</strong>
            </div>
            <span>
              <StatDebug
                stat="psychicNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
              %
            </span>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="flex items-center space-x-1">
              {DamageRenderers.shock?.icon}
              <strong className="text-muted-foreground">Shock</strong>
            </div>
            <span>
              <StatDebug
                stat="shockNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
              %
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-1">
              {StatRenderers.evasion?.icon}
              <strong className="text-muted-foreground">Evasion</strong>
            </div>
            <span>
              <StatDebug stat="evasion" unit={unit} comp={props.unit} />%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
