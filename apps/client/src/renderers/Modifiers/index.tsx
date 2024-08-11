import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DamageParentOnTurnEndId,
  DefenseUpAllId,
  SetIsStunnedParentId,
  InvertSpeedAllId,
  PowerDownParentId,
  PowerUpParentId,
  PowerDownAllOtherOnUnitEnterId,
  CreateSandstormOnUnitEnterId,
  SetIsInspectedAllId,
  DamageNewUnitsOnUnitEnterId,
  SandstormOnTurnEndId,
  DefenseDownParentId,
  SetIsProtectedParentId,
  DamageAllOnTurnEnd,
} from '@repo/game/data'
import { ReactNode } from 'react'
import { GiBiceps, GiBatteryPackAlt } from 'react-icons/gi'
import { AiFillCaretDown } from 'react-icons/ai'
import { HiFire } from 'react-icons/hi2'
import { IconType } from 'react-icons/lib'
import { GiSandstorm } from 'react-icons/gi'
import { BiSearch } from 'react-icons/bi'
import { GiShoulderArmor } from 'react-icons/gi'
import { GiVibratingShield } from 'react-icons/gi'
import { Modifier } from '@repo/game/types'
import { Separator } from '@/components/ui/separator'

export type ModifierRenderer = {
  name: ReactNode
  description?: (modifier: Modifier) => ReactNode
  Inline?: () => ReactNode
}

export const MODIFIER_NAMES: Record<string, string> = {
  [SetIsInspectedAllId]: 'Inspected',
  [BurnDamageOnTurnEndId]: 'Burn:Damage',
  [BurnedPowerDownId]: 'Burn:Power-Down',
  [DefenseDownParentId]: 'Defense Down',
  [DefenseUpAllId]: 'Defense Buff',
  [SetIsStunnedParentId]: 'Recharging',
  [InvertSpeedAllId]: 'Invert Speed',
  [PowerDownParentId]: 'Power Down',
  [PowerUpParentId]: 'Power Up',
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
  [PowerDownParentId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
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
      <span className="text-white font-bold">
        {MODIFIER_NAMES[SetIsInspectedAllId]}
      </span>
    ),
    description: () => (
      <div className="space-y-1">
        <span className="text-white font-bold">
          {MODIFIER_NAMES[SetIsInspectedAllId]}
        </span>
        <div className="text-muted-foreground">
          An inspected unit's stats are visible.
        </div>
      </div>
    ),
  },
  [BurnDamageOnTurnEndId]: {
    name: MODIFIER_NAMES[BurnDamageOnTurnEndId],
    Inline: () => (
      <span className="text-modifiers-burned">
        {MODIFIER_NAMES[BurnDamageOnTurnEndId]}
      </span>
    ),
  },
  [BurnedPowerDownId]: {
    name: MODIFIER_NAMES[BurnedPowerDownId],
    Inline: () => (
      <span className="text-modifiers-burned">
        {MODIFIER_NAMES[BurnedPowerDownId]}
      </span>
    ),
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
    Inline: () => (
      <span className="text-red-400">
        {MODIFIER_NAMES[SetIsStunnedParentId]}
      </span>
    ),
  },
  [InvertSpeedAllId]: {
    name: MODIFIER_NAMES[InvertSpeedAllId],
  },
  [PowerDownParentId]: {
    name: MODIFIER_NAMES[PowerDownParentId],
  },
  [PowerUpParentId]: {
    name: MODIFIER_NAMES[PowerUpParentId],
  },
  [SetIsProtectedParentId]: {
    name: MODIFIER_NAMES[SetIsProtectedParentId],
  },

  // Triggers
  [CreateSandstormOnUnitEnterId]: {
    name: MODIFIER_NAMES[CreateSandstormOnUnitEnterId],
  },
  [SandstormOnTurnEndId]: {
    name: (
      <span className="font-bold text-white">
        {MODIFIER_NAMES[SandstormOnTurnEndId]}
      </span>
    ),
    description: (modifier: Modifier) => (
      <div className="space-y-2">
        <span className="text-white">
          {MODIFIER_NAMES[SandstormOnTurnEndId]}
        </span>
        <div className="text-muted-foreground leading-normal">
          <span className="opacity-50 uppercase text-sm font-bold">
            On turn end:{' '}
          </span>
          All units take {(modifier as unknown as DamageAllOnTurnEnd).damage}{' '}
          damage.
        </div>
      </div>
    ),
  },
  [DamageNewUnitsOnUnitEnterId]: {
    name: MODIFIER_NAMES[DamageNewUnitsOnUnitEnterId],
  },
  [PowerDownAllOtherOnUnitEnterId]: {
    name: MODIFIER_NAMES[PowerDownAllOtherOnUnitEnterId],
  },
}
