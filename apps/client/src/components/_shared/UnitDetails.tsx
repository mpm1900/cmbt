import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { StatRenderers } from '@/renderers/Stats'
import { ElementProps } from '@/types'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import {
  DAMAGE_TYPES,
  DamageType,
  Modifier,
  StatKey,
  Unit,
} from '@repo/game/types'
import { getModifiersFromUnit, getUnitBase } from '@repo/game/utils'
import { ReactNode } from '@tanstack/react-router'
import { MagicArmor } from './MagicArmor'
import { PhysicalArmor } from './PhysicalArmor'
import { StatValue } from './StatValue'
import { UnitModifiers } from './UnitModifiers'

type UnitStatProps = {
  unit: Unit
  comp: Unit
  stat: StatKey
  before?: ReactNode
  after?: ReactNode
  map?: (value: number) => number
}

function Title(props: ElementProps) {
  return (
    <div
      className={cn(
        'text-center font-black text-muted-foreground/60 uppercase text-sm',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

function UnitStat(props: UnitStatProps) {
  const { unit, comp, stat, before, after, map } = props
  return (
    <div className="flex justify-between space-x-2">
      <div className="flex items-center space-x-1">
        <div className="h-[20px] w-[20px]">{StatRenderers[stat]?.icon}</div>
        <span className="text-muted-foreground font-bold whitespace-nowrap">
          {StatRenderers[stat]?.name ?? stat}
        </span>
      </div>
      <StatValue
        stat={stat}
        unit={unit}
        comp={comp}
        before={before}
        after={after}
        map={map}
      />
    </div>
  )
}

type UnitDamageStatProps = UnitStatProps & { damageType: DamageType }
function UnitDamageStat(props: UnitDamageStatProps) {
  const renderer = DamageRenderers[props.damageType]
  return (
    <div className="flex space-x-4 justify-between">
      <div className="flex items-center space-x-1">
        <div
          className={cn('h-[20px] w-[20px]')}
          style={{ fill: renderer?.color }}
        >
          {renderer?.icon}
        </div>
        <strong
          className="text-muted-foreground"
          style={{ color: renderer?.color }}
        >
          {renderer?.name}
        </strong>
      </div>
      <span>
        <StatValue
          stat={props.stat}
          unit={props.unit}
          comp={props.comp}
          before={props.before}
          after={props.after}
          map={props.map}
        />
      </span>
    </div>
  )
}

export type UnitDetailsProps = {
  unit: Unit
  comp: Unit
  modifiers?: Modifier[]
}

export function UnitDetails(props: UnitDetailsProps) {
  const { unit, comp, modifiers } = props
  const base = getUnitBase(unit.baseId)
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const mods = getModifiersFromUnit(unit)

  return (
    <div className="space-y-2">
      <div className="flex space-x-4">
        <div className="w-[160px]">
          <Title>Unit</Title>
          <Separator className="my-1" />
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 pt-2">
                <span>
                  <span className="text-sm text-muted-foreground font-thin">
                    Lv.
                  </span>
                  <span className="font-black">{unit.level}</span>
                </span>
                <div className="font-bold">{unit.name}</div>
              </div>

              <div className="text-muted-foreground">{base.base?.name}</div>
            </div>
            <Separator />
            <AspectRatio ratio={1} className="bg-muted"></AspectRatio>
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="space-y-4">
          <div>
            <Title>Stats</Title>
            <Separator className="my-1" />
            <UnitStat unit={unit} comp={comp} stat="attack" />
            <UnitStat unit={unit} comp={comp} stat="defense" />
            <UnitStat unit={unit} comp={comp} stat="magic" />
            <UnitStat unit={unit} comp={comp} stat="speed" />

            <Separator className="my-2" />
            <div className="space-y-2">
              <div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">HP</strong>
                  <span className="">
                    ({remainingHealth}/{unit.stats.health})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">FP</strong>
                  <span className="">
                    ({Math.max(unit.values.focus, 0)}/{unit.stats.focus})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">SP</strong>
                  <span className="">
                    ({Math.max(unit.values.stamina, 0)}/{unit.stats.stamina})
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <strong className="text-muted-foreground">DV</strong>
                  <span className="">
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
        <div>
          <div className="flex flex-1 space-x-2">
            <div>
              <Title>Type</Title>
              <Separator className="my-1" />
              {DAMAGE_TYPES.map((damageType) => {
                const renderer = DamageRenderers[damageType]
                return (
                  <div key={damageType} className="flex items-center space-x-1">
                    <div
                      className={cn('h-[20px] w-[20px]')}
                      style={{ fill: renderer?.color }}
                    >
                      {renderer?.icon}
                    </div>
                    <strong
                      className="text-muted-foreground"
                      style={{ color: renderer?.color }}
                    >
                      {renderer?.name}
                    </strong>
                  </div>
                )
              })}
            </div>
            <div>
              <Title>Dmg</Title>
              <Separator className="my-1" />
              {DAMAGE_TYPES.map((damageType) => {
                return (
                  <div
                    key={damageType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={`${damageType}Expansion`}
                      unit={unit}
                      comp={comp}
                      after="%"
                    />
                  </div>
                )
              })}
            </div>
            <div>
              <Title>Res</Title>
              <Separator className="my-1" />
              {DAMAGE_TYPES.map((damageType) => {
                return (
                  <div
                    key={damageType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={`${damageType}Negation`}
                      unit={unit}
                      comp={comp}
                      after="%"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <Separator className="my-2" />
          <UnitStat unit={unit} comp={comp} stat="evasion" after="%" />
          <UnitStat
            stat="accuracy"
            unit={unit}
            comp={comp}
            before="+"
            after="%"
          />
          <UnitStat
            stat="criticalChance"
            unit={unit}
            comp={comp}
            before="+"
            after="%"
          />
          <UnitStat
            stat="criticalDamage"
            unit={unit}
            comp={comp}
            before="+"
            after="%"
          />
        </div>
      </div>
      <Separator />

      <div className="space-y-2">
        <Title className="text-left">Modifiers</Title>
        <UnitModifiers modifiers={modifiers ?? mods} />
      </div>
    </div>
  )
}
