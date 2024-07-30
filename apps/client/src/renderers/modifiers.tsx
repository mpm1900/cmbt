import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DamageParentOnTurnEndId,
  DefenseUpAllId,
  SetRechargingParentId,
  InvertSpeedAllId,
  PowerDownParentId,
  PowerUpParentId,
  PowerDownAllOtherOnUnitEnterId,
} from '@repo/game/data'
import { ReactNode } from 'react'
import { GiBiceps, GiBatteryPackAlt } from 'react-icons/gi'
import { AiFillCaretDown } from 'react-icons/ai'
import { HiFire } from 'react-icons/hi2'
import { IconType } from 'react-icons/lib'

export type ModifierRenderer = {
  name: ReactNode
  Inline?: () => ReactNode
}

export const MODIFIER_NAMES: Record<string, string> = {
  [BurnDamageOnTurnEndId]: 'Burn:Damage',
  [BurnedPowerDownId]: 'Burn:Power-Down',
  [DamageParentOnTurnEndId]: 'Damage OTE',
  [DefenseUpAllId]: 'Defense Buff',
  [SetRechargingParentId]: 'Recharging',
  [InvertSpeedAllId]: 'Invert Speed',
  [PowerDownParentId]: 'Power Down',
  [PowerDownAllOtherOnUnitEnterId]: 'Intimidate',
  [PowerUpParentId]: 'Power Up',
}

export const MODIFIER_BASE_ICONS: Record<
  string,
  [IconType, IconType | undefined, string | undefined, string | undefined]
> = {
  [BurnDamageOnTurnEndId]: [HiFire, undefined, 'fill-orange-300', undefined],
  [BurnedPowerDownId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-orange-300',
    'fill-red-500',
  ],
  [PowerDownParentId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
  ],
  [SetRechargingParentId]: [
    GiBatteryPackAlt,
    undefined,
    'fill-red-400',
    undefined,
  ],
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
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
  [DefenseUpAllId]: {
    name: MODIFIER_NAMES[DefenseUpAllId],
  },
  [SetRechargingParentId]: {
    name: MODIFIER_NAMES[SetRechargingParentId],
    Inline: () => (
      <span className="text-red-400">
        {MODIFIER_NAMES[SetRechargingParentId]}
      </span>
    ),
  },
  [InvertSpeedAllId]: {
    name: MODIFIER_NAMES[InvertSpeedAllId],
  },
  [PowerDownParentId]: {
    name: MODIFIER_NAMES[PowerDownParentId],
  },
  [PowerDownAllOtherOnUnitEnterId]: {
    name: MODIFIER_NAMES[PowerDownAllOtherOnUnitEnterId],
  },
  [PowerUpParentId]: {
    name: MODIFIER_NAMES[PowerUpParentId],
  },
}
