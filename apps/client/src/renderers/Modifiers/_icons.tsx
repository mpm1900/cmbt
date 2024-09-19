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
  DivineLightId,
  DraconicAuraId,
  DrainLifeParentOnTurnEndId,
  EnragedParentId,
  EvasionDownParentId,
  EvasionUpParentId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  FirestormOnTurnEndId,
  HealingPrayerId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InfernoId,
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
  ScholarId,
  SeenAllId,
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
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUserSwitch,
} from 'react-icons/ai'
import { BsFire, BsShieldFillPlus } from 'react-icons/bs'
import { FaHeartCirclePlus, FaShieldHalved } from 'react-icons/fa6'
import {
  GiDeathJuice,
  GiDeathNote,
  GiDragonSpiral,
  GiFireRing,
  GiGhostAlly,
  GiGlowingHands,
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
  // Modifiers
  [BanedParentId]: <MdFrontHand className="fill-white h-full w-full" />,
  [BlessedParentId]: <GiSpikedHalo className="fill-white h-full w-full" />,
  [DisabledParentId]: <HiMiniNoSymbol className="fill-white h-full w-full" />,
  [EnragedParentId]: <GiOverkill className="fill-white h-full w-full" />,
  [HiddenParentId]: (
    <AiOutlineEyeInvisible className="fill-white h-full w-full" />
  ),
  [IntangibleParentId]: <GiGhostAlly className="fill-white h-full w-full" />,
  // TODO: InvertSpeedAll
  [ProtectedParentId]: (
    <GiVibratingShield className="fill-white h-full w-full" />
  ),
  [StunnedParentId]: <TiSpiral className="fill-red-200 h-full w-full" />,

  // Triggeres
  [InfernoId]: <GiFireRing className="fill-orange-300 h-full w-full" />,
  [DrainLifeParentOnTurnEndId]: (
    <GiDeathJuice className="fill-white h-full w-full" />
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

  // Override Modifiers
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
  [EvasionDownParentId]: <StatModifierIcon stat="evasion" type="down" />,
  [EvasionUpParentId]: <StatModifierIcon stat="evasion" type="up" />,
  // [InspectedAllId]: <BiSearch className="fill-white h-full w-full" />,
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
  [PowerStanceId]: <GiSpinningBlades className="fill-white h-full w-full" />,
  [SeenAllId]: <AiOutlineEye className="fill-white h-full w-full" />,

  // Override Triggers
  [CursedMiasmaId]: <GiPoisonGas className="fill-white h-full w-full" />,
  [DivineHealingId]: (
    <div className="p-0.5">
      <GiTemplarHeart className="fill-amber-200 h-full w-full" />
    </div>
  ),
  [DivineLightId]: <GiGlowingHands className="fill-white h-full w-full" />,
  [DraconicAuraId]: <GiDragonSpiral className="fill-white h-full w-full" />,
  [FirestormOnTurnEndId]: <GiFireRing className="fill-white h-full w-full" />,
  [HealingPrayerId]: <GiHeartWings className="fill-white h-full w-full" />,
  [KillParentOnTurnEndId]: (
    <GiDeathNote className="fill-teal-400 h-full w-full" />
  ),
  [ScholarId]: <PiScrollFill className="fill-white h-full w-full" />,
  [SleepingParentId]: <RiZzzFill className="fill-violet-300 h-full w-full" />,
}
