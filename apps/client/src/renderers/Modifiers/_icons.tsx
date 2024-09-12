import {
  AddStatModifiersImmunityAllId,
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParentId,
  AttackStageDownParentId,
  AttackStageUpParentId,
  AttackUpParentId,
  CreateSandstormOnUnitEnterId,
  DefenseDownParentId,
  DefenseStageDownParentId,
  DefenseStageUpParentId,
  DefneseUpParentId,
  DisabledParentId,
  DivineHealingId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  HealParentOnUnitSwitchId,
  HexedParentId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  PowerStanceId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedStageDownParentId,
  SpeedStageUpParentId,
  SpeedUpParentId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { StatModifierIcon } from '@shared/StatModifierIcon'
import { ReactNode } from 'react'
import {
  AiFillCaretUp,
  AiOutlineEyeInvisible,
  AiOutlineUserSwitch,
} from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsFire, BsShieldFillPlus } from 'react-icons/bs'
import { FaHeartCirclePlus } from 'react-icons/fa6'
import {
  GiDualityMask,
  GiMagicSwirl,
  GiSandstorm,
  GiSpinningBlades,
  GiTemplarHeart,
  GiVibratingShield,
} from 'react-icons/gi'
import { HiMiniNoSymbol } from 'react-icons/hi2'
import { MdOutlineHexagon } from 'react-icons/md'
import { PiScrollFill } from 'react-icons/pi'
import { TiSpiral } from 'react-icons/ti'

export const MODIFIER_ICONS: Record<Id, ReactNode> = {
  [AddStatModifiersImmunityAllId]: (
    <GiMagicSwirl className="fill-white h-full w-full" />
  ),
  [AttackDownParentId]: <StatModifierIcon stat="attack" type="down" />,
  [AttackStageDownParentId]: <StatModifierIcon stat="attack" type="down" />,
  [AttackStageUpParentId]: <StatModifierIcon stat="attack" type="up" />,
  [AttackUpParentId]: <StatModifierIcon stat="attack" type="up" />,
  [DefenseDownParentId]: <StatModifierIcon stat="defense" type="down" />,
  [DefenseStageDownParentId]: <StatModifierIcon stat="defense" type="down" />,
  [DefenseStageUpParentId]: <StatModifierIcon stat="defense" type="up" />,
  [DefneseUpParentId]: <StatModifierIcon stat="defense" type="up" />,
  [SpeedStageDownParentId]: <StatModifierIcon stat="speed" type="down" />,
  [SpeedStageUpParentId]: <StatModifierIcon stat="speed" type="up" />,
  [SpeedUpParentId]: <StatModifierIcon stat="speed" type="up" />,
  [SpeedUpTeamId]: <StatModifierIcon stat="speed" type="up" />,
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
  [AttackDownAllOtherOnUnitEnterId]: (
    <GiDualityMask className="fill-white h-full w-full" />
  ),
  [CreateSandstormOnUnitEnterId]: (
    <GiSandstorm className="fill-amber-100 h-full w-full" />
  ),
  [SandstormOnTurnEndId]: <GiSandstorm className="fill-white h-full w-full" />,
  [DisabledParentId]: <HiMiniNoSymbol className="fill-white h-full w-full" />,
  [InspectAllOnUnitEnterId]: (
    <PiScrollFill className="fill-white h-full w-full" />
  ),
  [InspectedAllId]: <BiSearch className="fill-white h-full w-full" />,
  [ProtectedParentId]: (
    <GiVibratingShield className="fill-white h-full w-full" />
  ),
  [StunnedParentId]: <TiSpiral className="fill-red-200 h-full w-full" />,

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
