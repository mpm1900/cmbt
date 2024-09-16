import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { StatRenderers } from '@/renderers/Stats'
import { ElementProps, PropsWithClassname } from '@/types'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import {
  ATTACK_TYPES,
  DAMAGE_TYPES,
  Modifier,
  StatKey,
  Unit,
} from '@repo/game/types'
import { getAllModifiersFromUnit, getUnitBase } from '@repo/game/utils'
import { ReactNode } from '@tanstack/react-router'
import { AttackTypeBadge } from './AttackTypeBadge'
import { HealthBadge } from './HealthBadge'
import { MagicArmor } from './MagicArmor'
import { PhysicalArmor } from './PhysicalArmor'
import { StatValue } from './StatValue'
import { UnitModifiers } from './UnitModifiers'

type UnitStatProps = PropsWithClassname<{
  unit: Unit
  comp: Unit
  stat: StatKey
  before?: ReactNode
  after?: ReactNode
  map?: (value: number) => number
}>

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
    <div className="flex justify-between space-x-4">
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
        className={props.className}
        map={map}
      />
    </div>
  )
}

export type UnitDetailsProps = {
  unit: Unit
  original: Unit
  modifiers?: Modifier[]
}

export function UnitDetails(props: UnitDetailsProps) {
  const { unit, original, modifiers } = props
  const base = getUnitBase(unit.baseId)
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const mods = getAllModifiersFromUnit(unit)

  return (
    <div className="space-y-2">
      <div className="flex space-x-4">
        <div className="">
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
            <AspectRatio ratio={4 / 3} className="bg-muted"></AspectRatio>
            <Separator />
            <div className="flex justify-around items-center space-x-1 p-1">
              <HealthBadge className="px-2">
                {remainingHealth}/{unit.stats.health}
              </HealthBadge>
              <MagicArmor className="px-2">
                <span>{unit.values.magicArmor}</span>
              </MagicArmor>

              <PhysicalArmor className="px-2">
                <span>{unit.values.physicalArmor}</span>
              </PhysicalArmor>
            </div>
          </div>
        </div>
        <div className="w-[1px] bg-border" />
        <div className="space-y-4">
          <div>
            <Title>Stats</Title>
            <Separator className="my-1" />
            <UnitStat unit={unit} comp={original} stat="health" />
            <UnitStat unit={unit} comp={original} stat="attack" />
            <UnitStat unit={unit} comp={original} stat="defense" />
            <UnitStat unit={unit} comp={original} stat="magic" />
            <UnitStat unit={unit} comp={original} stat="speed" />

            <Separator className="my-2" />
            <UnitStat
              unit={unit}
              comp={original}
              stat="evasion"
              after="%"
              className={cn({
                'text-muted-foreground/60': original.stats.evasion === 0,
              })}
            />
            <UnitStat
              stat="accuracy"
              unit={unit}
              comp={original}
              before="+"
              after="%"
              className={cn({
                'text-muted-foreground/60': original.stats.accuracy === 0,
              })}
            />
            <UnitStat
              stat="criticalChance"
              unit={unit}
              comp={original}
              before="+"
              after="%"
              className={cn({
                'text-muted-foreground/60': original.stats.criticalChance === 0,
              })}
            />
            <UnitStat
              stat="criticalDamage"
              unit={unit}
              comp={original}
              before="+"
              after="%"
              className={cn({
                'text-muted-foreground/60': original.stats.criticalDamage === 0,
              })}
            />
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
              <Separator className="my-2" />
              {ATTACK_TYPES.map((attackType) => {
                return (
                  <div
                    key={attackType}
                    className="flex items-center space-x-1 h-[24px]"
                  >
                    <AttackTypeBadge attackType={attackType} />
                  </div>
                )
              })}
            </div>
            <div>
              <Title>Dmg</Title>
              <Separator className="my-1" />
              {DAMAGE_TYPES.map((damageType) => {
                const stat: StatKey = `${damageType}Expansion`
                return (
                  <div
                    key={damageType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={stat}
                      className={cn({
                        'text-muted-foreground/60': unit.stats[stat] === 100,
                      })}
                      unit={unit}
                      comp={original}
                      after="%"
                    />
                  </div>
                )
              })}
              <Separator className="my-2" />
              {ATTACK_TYPES.map((attackType) => {
                const stat: StatKey = `${attackType}Expansion`
                return (
                  <div
                    key={attackType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={stat}
                      className={cn({
                        'text-muted-foreground/60': unit.stats[stat] === 100,
                      })}
                      unit={unit}
                      comp={original}
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
                const stat: StatKey = `${damageType}Negation`
                return (
                  <div
                    key={damageType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={stat}
                      className={cn({
                        'text-muted-foreground/60': unit.stats[stat] === 0,
                      })}
                      unit={unit}
                      comp={original}
                      after="%"
                    />
                  </div>
                )
              })}
              <Separator className="my-2" />
              {ATTACK_TYPES.map((attackType) => {
                const stat: StatKey = `${attackType}Negation`
                return (
                  <div
                    key={attackType}
                    className="flex items-center justify-end space-x-1"
                  >
                    <StatValue
                      stat={stat}
                      className={cn({
                        'text-muted-foreground/60': unit.stats[stat] === 0,
                      })}
                      unit={unit}
                      comp={original}
                      after="%"
                    />
                  </div>
                )
              })}
            </div>
          </div>
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
