import {
  DefenseDownParentId,
  FireNegationUpParentId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  SandstormOnTurnEndId,
  SetIsInspectedAllId,
  SetIsProtectedParentId,
  SetIsStunnedParentId,
  SpeedUpTeamId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsShieldFillPlus } from 'react-icons/bs'
import {
  GiBiceps,
  GiSandstorm,
  GiShoulderArmor,
  GiSprint,
  GiVibratingShield,
} from 'react-icons/gi'
import { ImFire } from 'react-icons/im'
import { TiSpiral } from 'react-icons/ti'

export const MODIFIER_ICONS: Record<Id, ReactNode> = {
  [DefenseDownParentId]: (
    <div className="h-full w-full relative">
      <GiShoulderArmor className="fill-white h-full w-full" />
      <AiFillCaretDown
        className="absolute fill-red-400 h-[16px] w-[16px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [FireNegationUpParentId]: (
    <div className="h-full w-full relative">
      <ImFire className="fill-white h-full w-full" />
      <BsShieldFillPlus
        className="absolute fill-green-400 h-[16px] w-[16px]"
        style={{ bottom: -2, right: -2 }}
      />
    </div>
  ),
  [PhysicalAttackDownParentId]: (
    <div className="h-full w-full relative">
      <GiBiceps className="fill-white h-full w-full" />
      <AiFillCaretDown
        className="absolute fill-red-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [PhysicalAttackUpParentId]: (
    <div className="h-full w-full relative">
      <GiBiceps className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [SandstormOnTurnEndId]: (
    <GiSandstorm className="fill-amber-100 h-full w-full" />
  ),
  [SetIsInspectedAllId]: <BiSearch className="fill-white h-full w-full" />,
  [SetIsProtectedParentId]: (
    <GiVibratingShield className="fill-white h-full w-full" />
  ),
  [SetIsStunnedParentId]: <TiSpiral className="fill-red-200 h-full w-full" />,
  [SpeedUpTeamId]: (
    <div className="h-full w-full relative">
      <GiSprint className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -4, right: -6 }}
      />
    </div>
  ),
}
