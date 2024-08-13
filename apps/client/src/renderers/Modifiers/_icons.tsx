import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DefenseDownParentId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  SandstormOnTurnEndId,
  SetIsInspectedAllId,
  SetIsProtectedParentId,
  SetIsStunnedParentId,
} from '@repo/game/data'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import {
  GiBatteryPackAlt,
  GiBiceps,
  GiSandstorm,
  GiShoulderArmor,
  GiVibratingShield,
} from 'react-icons/gi'
import { HiFire } from 'react-icons/hi2'
import { IconType } from 'react-icons/lib'

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
