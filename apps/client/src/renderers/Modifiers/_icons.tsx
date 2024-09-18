import {
  AccuracyDownParentId,
  AccuracyUpParentId,
  AddStatModifiersImmunityAllId,
  AttackDownAllId,
  AttackDownParentId,
  AttackStageDownParentId,
  AttackStageUpParentId,
  AttackUpParentId,
  BanedParentId,
  BlessedParentId,
  CreateFirestormOnUnitEnterId,
  CriticalChanceDownParentId,
  CriticalChanceUpParentId,
  CriticalDamageDownParentId,
  CriticalDamageUpParentId,
  CursedMiasmaId,
  DefenseDownParentId,
  DefenseStageDownParentId,
  DefenseStageUpParentId,
  DefneseUpParentId,
  DisabledParentId,
  DivineHealingId,
  DraconicAuraId,
  DrainLifeParentOnTurnEndId,
  EnragedParentId,
  EvasionDownParentId,
  EvasionUpParentId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  FirestormOnTurnEndId,
  HealingPrayerTriggerId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  IntangibleParentId,
  KillParentOnTurnEndId,
  MagicDownParentId,
  MagicExpansionUpParentId,
  MagicStageDownParentId,
  MagicStageUpParentId,
  MagicUpParentId,
  MaxAttackParentId,
  PowerStanceId,
  ProtectedParentId,
  SleepingParentId,
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
import { FaHeartCirclePlus, FaShieldHalved } from 'react-icons/fa6'
import {
  GiDeathJuice,
  GiDeathNote,
  GiDragonSpiral,
  GiFireRing,
  GiGhostAlly,
  GiHeartWings,
  GiMagicSwirl,
  GiOverkill,
  GiPoisonGas,
  GiSpikedHalo,
  GiSpinningBlades,
  GiTemplarHeart,
  GiVibratingShield,
} from 'react-icons/gi'
import { HiMiniNoSymbol } from 'react-icons/hi2'
import { MdFrontHand } from 'react-icons/md'
import { PiScrollFill } from 'react-icons/pi'
import { RiZzzFill } from 'react-icons/ri'
import { TiSpiral } from 'react-icons/ti'

export const MODIFIER_ICONS: Record<Id, ReactNode> = {
  [AccuracyDownParentId]: <StatModifierIcon stat="accuracy" type="down" />,
  [AccuracyUpParentId]: <StatModifierIcon stat="accuracy" type="up" />,
  [AddStatModifiersImmunityAllId]: (
    <GiMagicSwirl className="fill-white h-full w-full" />
  ),
  [AttackDownAllId]: <StatModifierIcon stat="attack" type="down" />,
  [AttackDownParentId]: <StatModifierIcon stat="attack" type="down" />,
  [AttackStageDownParentId]: <StatModifierIcon stat="attack" type="down" />,
  [AttackStageUpParentId]: <StatModifierIcon stat="attack" type="up" />,
  [AttackUpParentId]: <StatModifierIcon stat="attack" type="up" />,
  [MaxAttackParentId]: <StatModifierIcon stat="attack" type="up" />,
  [CriticalChanceDownParentId]: (
    <StatModifierIcon stat="criticalChance" type="down" />
  ),
  [CriticalChanceUpParentId]: (
    <StatModifierIcon stat="criticalChance" type="up" />
  ),
  [CriticalDamageDownParentId]: (
    <StatModifierIcon stat="criticalDamage" type="down" />
  ),
  [CriticalDamageUpParentId]: (
    <StatModifierIcon stat="criticalDamage" type="up" />
  ),
  [DefenseDownParentId]: <StatModifierIcon stat="defense" type="down" />,
  [DefenseStageDownParentId]: <StatModifierIcon stat="defense" type="down" />,
  [DefenseStageUpParentId]: <StatModifierIcon stat="defense" type="up" />,
  [DefneseUpParentId]: <StatModifierIcon stat="defense" type="up" />,
  [EnragedParentId]: <GiOverkill className="fill-white h-full w-full" />,
  [EvasionDownParentId]: <StatModifierIcon stat="evasion" type="down" />,
  [EvasionUpParentId]: <StatModifierIcon stat="evasion" type="up" />,
  [MagicDownParentId]: <StatModifierIcon stat="magic" type="down" />,
  [MagicStageDownParentId]: <StatModifierIcon stat="magic" type="down" />,
  [MagicStageUpParentId]: <StatModifierIcon stat="magic" type="up" />,
  [MagicExpansionUpParentId]: (
    <FaShieldHalved className="fill-white h-full w-full" />
  ),
  [MagicUpParentId]: <StatModifierIcon stat="magic" type="up" />,
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
  [DraconicAuraId]: <GiDragonSpiral className="fill-white h-full w-full" />,
  [CursedMiasmaId]: <GiPoisonGas className="fill-white h-full w-full" />,
  [CreateFirestormOnUnitEnterId]: (
    <GiFireRing className="fill-orange-300 h-full w-full" />
  ),
  [FirestormOnTurnEndId]: <GiFireRing className="fill-white h-full w-full" />,
  [DisabledParentId]: <HiMiniNoSymbol className="fill-white h-full w-full" />,
  [IntangibleParentId]: <GiGhostAlly className="fill-white h-full w-full" />,
  [InspectAllOnUnitEnterId]: (
    <PiScrollFill className="fill-white h-full w-full" />
  ),
  [InspectedAllId]: <BiSearch className="fill-white h-full w-full" />,
  [ProtectedParentId]: (
    <GiVibratingShield className="fill-white h-full w-full" />
  ),
  [StunnedParentId]: <TiSpiral className="fill-red-200 h-full w-full" />,
  [SleepingParentId]: <RiZzzFill className="fill-violet-300 h-full w-full" />,

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
  [BlessedParentId]: (
    <div>
      <GiSpikedHalo className="fill-white h-full w-full" />
    </div>
  ),
  [BanedParentId]: (
    <div>
      <MdFrontHand className="fill-white h-full w-full" />
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
  [KillParentOnTurnEndId]: (
    <GiDeathNote className="fill-teal-400 h-full w-full" />
  ),
  [DrainLifeParentOnTurnEndId]: (
    <GiDeathJuice className="fill-white h-full w-full" />
  ),
  [HealingPrayerTriggerId]: (
    <GiHeartWings className="fill-white h-full w-full" />
  ),
}
