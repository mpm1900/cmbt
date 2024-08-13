import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DamageParentOnTurnEndId,
  DefenseUpAllId,
  SetIsStunnedParentId,
  InvertSpeedAllId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  PowerDownAllOtherOnUnitEnterId,
  CreateSandstormOnUnitEnterId,
  SetIsInspectedAllId,
  DamageNewUnitsOnUnitEnterId,
  SandstormOnTurnEndId,
  DefenseDownParentId,
  SetIsProtectedParentId,
  DamageAllOnTurnEnd,
  DamageParentOnTurnEnd,
  PhysicalAttackDownParent,
  CreateSandstormOnUnitEnter,
} from '@repo/game/data'
import { ReactNode } from 'react'
import { GiBiceps, GiBatteryPackAlt } from 'react-icons/gi'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { HiFire } from 'react-icons/hi2'
import { IconType } from 'react-icons/lib'
import { GiSandstorm } from 'react-icons/gi'
import { BiSearch } from 'react-icons/bi'
import { GiShoulderArmor } from 'react-icons/gi'
import { GiVibratingShield } from 'react-icons/gi'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'

export type ModifierRenderer = {
  name: ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const MODIFIER_NAMES: Record<string, string> = {
  [SetIsInspectedAllId]: 'Inspected',
  [BurnDamageOnTurnEndId]: 'Burn:Damage',
  [BurnedPowerDownId]: 'Burn:Power-Down',
  [DefenseDownParentId]: 'Defense Down',
  [DefenseUpAllId]: 'Defense Buff',
  [SetIsStunnedParentId]: 'Recharging',
  [InvertSpeedAllId]: 'Invert Speed',
  [PhysicalAttackDownParentId]: 'Physical Attack Down',
  [PhysicalAttackUpParentId]: 'Physical Attack Up',
  [SetIsProtectedParentId]: 'Protected',

  [CreateSandstormOnUnitEnterId]: 'Sand Stream',
  [SandstormOnTurnEndId]: 'Sandstorm',
  [DamageNewUnitsOnUnitEnterId]: 'Spikes',
  [PowerDownAllOtherOnUnitEnterId]: 'Intimidate',
}

export const MODIFIER_BASE_ICONS: Record<
  string,
  [IconType, IconType | undefined, string | undefined, string | undefined]
> = {
  [SetIsInspectedAllId]: [BiSearch, undefined, 'fill-white', undefined],
  [BurnDamageOnTurnEndId]: [HiFire, undefined, 'fill-orange-300', undefined],
  [BurnedPowerDownId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-orange-300',
    'fill-red-500',
  ],
  [DefenseDownParentId]: [
    GiShoulderArmor,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
  ],
  [PhysicalAttackDownParentId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
  ],
  [PhysicalAttackUpParentId]: [
    GiBiceps,
    AiFillCaretUp,
    'fill-white',
    'fill-green-500',
  ],
  [SetIsProtectedParentId]: [
    GiVibratingShield,
    undefined,
    'fill-white',
    undefined,
  ],
  [SetIsStunnedParentId]: [
    GiBatteryPackAlt,
    undefined,
    'fill-red-400',
    undefined,
  ],
  [SandstormOnTurnEndId]: [GiSandstorm, undefined, 'fill-amber-100', undefined],
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [SetIsInspectedAllId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SetIsInspectedAllId]}</span>
    ),
    description: () => (
      <div className="text-muted-foreground">
        An inspected unit's stats are visible.
      </div>
    ),
  },
  [BurnDamageOnTurnEndId]: {
    name: MODIFIER_NAMES[BurnDamageOnTurnEndId],
    description: (mod) => {
      const modifier = mod as DamageParentOnTurnEnd
      return (
        <div>
          <span className="opacity-50 uppercase text-sm font-bold">
            On turn end:{' '}
          </span>
          Afflicted unit takes {modifier.damage} damage.
        </div>
      )
    },
  },
  [BurnedPowerDownId]: {
    name: MODIFIER_NAMES[BurnedPowerDownId],
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted unit's physical attack stat is divided by {modifier.coef}.
        </div>
      )
    },
  },
  [DamageParentOnTurnEndId]: {
    name: MODIFIER_NAMES[BurnDamageOnTurnEndId],
  },
  [DefenseDownParentId]: {
    name: MODIFIER_NAMES[DefenseDownParentId],
  },
  [DefenseUpAllId]: {
    name: MODIFIER_NAMES[DefenseUpAllId],
  },
  [SetIsStunnedParentId]: {
    name: MODIFIER_NAMES[SetIsStunnedParentId],
  },
  [InvertSpeedAllId]: {
    name: MODIFIER_NAMES[InvertSpeedAllId],
  },
  [PhysicalAttackDownParentId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[PhysicalAttackDownParentId]}
      </span>
    ),
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted unit's physical attack stat is divided by {modifier.coef}.
        </div>
      )
    },
  },
  [PhysicalAttackUpParentId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[PhysicalAttackUpParentId]}
      </span>
    ),
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted unit's physical attack stat is multiplied by {modifier.coef}
          .
        </div>
      )
    },
  },
  [SetIsProtectedParentId]: {
    name: MODIFIER_NAMES[SetIsProtectedParentId],
  },

  // Triggers
  [CreateSandstormOnUnitEnterId]: {
    name: MODIFIER_NAMES[CreateSandstormOnUnitEnterId],
    description: (mod) => {
      const modifier = mod as CreateSandstormOnUnitEnter
      return (
        <div className="text-muted-foreground leading-normal">
          <span className="opacity-50 uppercase text-sm font-bold">
            On self enter:{' '}
          </span>
          <span>
            Applies{' '}
            <ModifierInline
              modifier={
                new DamageAllOnTurnEnd({
                  rid: SandstormOnTurnEndId,
                  damage: 30,
                  duration: 5,
                  maxInstances: 1,
                })
              }
            />{' '}
            to all units.
          </span>
        </div>
      )
    },
  },
  [SandstormOnTurnEndId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SandstormOnTurnEndId]}</span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground leading-normal">
        <span className="opacity-50 uppercase text-sm font-bold">
          On turn end:{' '}
        </span>
        Afflicted unit takes{' '}
        {(modifier as unknown as DamageAllOnTurnEnd).damage} damage.
      </div>
    ),
  },
  [DamageNewUnitsOnUnitEnterId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[DamageNewUnitsOnUnitEnterId]}
      </span>
    ),
  },
  [PowerDownAllOtherOnUnitEnterId]: {
    name: MODIFIER_NAMES[PowerDownAllOtherOnUnitEnterId],
    description: (modifier: Modifier) => (
      <div>
        <span className="opacity-50 uppercase text-sm font-bold">
          On self enter:{' '}
        </span>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new PhysicalAttackDownParent({
                coef: 1.5,
              })
            }
          />{' '}
          to all other units.
        </span>
      </div>
    ),
  },
}
