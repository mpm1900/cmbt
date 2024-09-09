import { useCombatContext } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { applyModifiers } from '@repo/game/utils'
import { GiCreditsCurrency } from 'react-icons/gi'
import { XpBar } from './XpBar'

export type CombatRewardsPreviewProps = {}

export function CombatRewardsPreview(props: CombatRewardsPreviewProps) {
  const {} = props
  const ctx = useCombatContext()
  const combat = useCombat()
  const userUnits = ctx.units
    .filter((u) => u.teamId === ctx.user)
    .map((u) => applyModifiers(u, ctx).unit)
  const xpUnit = userUnits.find((u) => u.stats.xpMultiplier === 100)
  const nonStandardUnits = userUnits.filter((u) => u.stats.xpMultiplier !== 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="font-black">+{combat.reward.resources.credits}</div>
        <GiCreditsCurrency />
      </div>
      {xpUnit && (
        <div>
          <div className="font-black">+{combat.reward.xp}XP</div>
          <XpBar unit={xpUnit} xp={combat.reward.xp} />
        </div>
      )}
      {nonStandardUnits.map((u) => (
        <div>
          <div className="font-black">
            {u.name} ({u.stats.xpMultiplier}%)
          </div>
          <XpBar
            unit={u}
            xp={combat.reward.xp * (u.stats.xpMultiplier / 100)}
          />
        </div>
      ))}
    </div>
  )
}
