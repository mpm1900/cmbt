import {
  AttackDownParentId,
  AttackStageDownParentId,
  AttackStageUpParentId,
  AttackUpParentId,
  DefenseDownParentId,
  DefenseStageUpParentId,
  DefneseUpParentId,
  DisabledParentId,
  DivineHealingId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  HealParentOnUnitSwitchId,
  HexedParentId,
  HiddenParentId,
  InspectedAllId,
  PowerStanceId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedStageUpParentId,
  SpeedUpParentId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from 'react'
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineEyeInvisible,
  AiOutlineUserSwitch,
} from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsFire, BsShieldFillPlus } from 'react-icons/bs'
import { FaHeartCirclePlus } from 'react-icons/fa6'
import {
  GiBiceps,
  GiCrenulatedShield,
  GiSandstorm,
  GiSpinningBlades,
  GiSprint,
  GiTemplarHeart,
  GiVibratingShield,
} from 'react-icons/gi'
import { HiMiniNoSymbol } from 'react-icons/hi2'
import { MdOutlineHexagon } from 'react-icons/md'
import { TiSpiral } from 'react-icons/ti'

export const MODIFIER_ICONS: Record<Id, ReactNode> = {
  [DefenseDownParentId]: (
    <div className="h-full w-full relative">
      <GiCrenulatedShield className="fill-white h-full w-full" />
      <AiFillCaretDown
        className="absolute fill-red-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [DefneseUpParentId]: (
    <div className="h-full w-full relative">
      <GiCrenulatedShield className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [DefenseStageUpParentId]: (
    <div className="h-full w-full relative">
      <GiCrenulatedShield className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [FireDamageUpParentId]: (
    <div className="h-full w-full relative">
      <BsFire className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ top: -6, right: -6 }}
      />
    </div>
  ),
  [FireNegationUpParentId]: (
    <div className="h-full w-full relative">
      <BsFire className="fill-white h-full w-full" />
      <BsShieldFillPlus
        className="absolute fill-green-400 h-[12px] w-[12px]"
        style={{ bottom: -2, right: -2 }}
      />
    </div>
  ),
  [AttackDownParentId]: (
    <div className="h-full w-full relative">
      <GiBiceps className="fill-white h-full w-full" />
      <AiFillCaretDown
        className="absolute fill-red-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [AttackStageDownParentId]: (
    <div className="h-full w-full relative">
      <GiBiceps className="fill-white h-full w-full" />
      <AiFillCaretDown
        className="absolute fill-red-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [AttackUpParentId]: (
    <div className="h-full w-full relative">
      <GiBiceps className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [AttackStageUpParentId]: (
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
  [DisabledParentId]: <HiMiniNoSymbol className="fill-white h-full w-full" />,
  [InspectedAllId]: <BiSearch className="fill-white h-full w-full" />,
  [ProtectedParentId]: (
    <GiVibratingShield className="fill-white h-full w-full" />
  ),
  [StunnedParentId]: <TiSpiral className="fill-red-200 h-full w-full" />,
  [SpeedUpParentId]: (
    <div className="h-full w-full relative">
      <GiSprint className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [SpeedStageUpParentId]: (
    <div className="h-full w-full relative">
      <GiSprint className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [SpeedUpTeamId]: (
    <div className="h-full w-full relative">
      <GiSprint className="fill-white h-full w-full" />
      <AiFillCaretUp
        className="absolute fill-green-400 h-[24px] w-[24px]"
        style={{ bottom: -6, right: -6 }}
      />
    </div>
  ),
  [HealParentOnUnitSwitchId]: (
    <div className="h-full w-full relative">
      <AiOutlineUserSwitch className="fill-white h-full w-full" />
      <FaHeartCirclePlus
        className="absolute fill-green-400 h-[12px] w-[12px]"
        style={{ bottom: 0, left: 0 }}
      />
    </div>
  ),
  [PowerStanceId]: (
    <div>
      <GiSpinningBlades className="fill-white h-full w-full" />
    </div>
  ),
  [HexedParentId]: (
    <div>
      <MdOutlineHexagon className="fill-white h-full w-full" />
    </div>
  ),
  [HiddenParentId]: (
    <div>
      <AiOutlineEyeInvisible className="fill-white h-full w-full" />
    </div>
  ),
  [DivineHealingId]: (
    <div className="p-0.5">
      <GiTemplarHeart className="fill-amber-200 h-full w-full" />
    </div>
  ),
}
