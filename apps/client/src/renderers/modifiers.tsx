import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DamageParentOnTurnEndId,
  DefenseUpAllId,
  SetRechargingParentId,
  InvertSpeedAllId,
  PowerDownParentId,
  PowerUpParentId,
} from '@repo/game/data'
import { ReactNode } from 'react'

export type ModifierRenderer = {
  name: ReactNode
  Inline?: () => ReactNode
}

export const MODIFIER_NAMES: Record<string, string> = {
  [BurnDamageOnTurnEndId]: 'Burned:Damage',
  [BurnedPowerDownId]: 'Burned:Power-Down',
  [DamageParentOnTurnEndId]: 'Damage OTE',
  [DefenseUpAllId]: 'Defense Buff',
  [SetRechargingParentId]: 'Recharging',
  [InvertSpeedAllId]: 'Invert Speed',
  [PowerDownParentId]: 'Power Down',
  [PowerUpParentId]: 'Power Up',
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
  [PowerUpParentId]: {
    name: MODIFIER_NAMES[PowerUpParentId],
  },
}
