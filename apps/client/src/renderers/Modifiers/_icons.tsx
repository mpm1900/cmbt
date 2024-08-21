import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DefenseDownParentId,
  FireNegationUpParentId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  SandstormOnTurnEndId,
  SetIsInspectedAllId,
  SetIsProtectedParentId,
  SetIsStunnedParentId,
} from '@repo/game/data'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsShieldFillPlus } from 'react-icons/bs'
import {
  GiBiceps,
  GiSandstorm,
  GiShoulderArmor,
  GiVibratingShield,
} from 'react-icons/gi'
import { HiFire } from 'react-icons/hi2'
import { ImFire } from 'react-icons/im'
import { IconType } from 'react-icons/lib'
import { TiSpiral } from 'react-icons/ti'

export const MODIFIER_BASE_ICONS: Record<
  string,
  [
    IconType,
    IconType | undefined,
    string | undefined,
    string | undefined,
    number?,
    [number, number]?,
  ]
> = {
  [SetIsInspectedAllId]: [BiSearch, undefined, 'fill-white', undefined],
  [BurnDamageOnTurnEndId]: [
    HiFire,
    undefined,
    'fill-orange-300',
    undefined,
    undefined,
  ],
  [BurnedPowerDownId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-orange-300',
    'fill-red-500',
    undefined,
    undefined,
  ],
  [DefenseDownParentId]: [
    GiShoulderArmor,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
    undefined,
    undefined,
  ],
  [FireNegationUpParentId]: [
    ImFire,
    BsShieldFillPlus,
    'fill-white',
    'fill-green-500',
    16,
    [-1, -2],
  ],
  [PhysicalAttackDownParentId]: [
    GiBiceps,
    AiFillCaretDown,
    'fill-white',
    'fill-red-500',
    undefined,
    undefined,
  ],
  [PhysicalAttackUpParentId]: [
    GiBiceps,
    AiFillCaretUp,
    'fill-white',
    'fill-green-500',
    undefined,
    undefined,
  ],
  [SetIsProtectedParentId]: [
    GiVibratingShield,
    undefined,
    'fill-white',
    undefined,
    undefined,
    undefined,
  ],
  [SetIsStunnedParentId]: [
    TiSpiral,
    undefined,
    'fill-red-200',
    undefined,
    undefined,
    undefined,
  ],
  [SandstormOnTurnEndId]: [
    GiSandstorm,
    undefined,
    'fill-amber-100',
    undefined,
    undefined,
    undefined,
  ],
}
