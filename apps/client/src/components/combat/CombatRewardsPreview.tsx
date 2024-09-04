import { useCombat } from '@/hooks/state'
import { GiCreditsCurrency } from 'react-icons/gi'
import { XpBar } from './XpBar'

export type CombatRewardsPreviewProps = {}

export function CombatRewardsPreview(props: CombatRewardsPreviewProps) {
  const {} = props
  const combat = useCombat()
  const userUnits = combat.units.filter((u) => u.teamId === combat.user)
  const xpUnit = userUnits[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="font-black">+{combat.reward.resources.credits}</div>
        <GiCreditsCurrency />
      </div>
      <div key={xpUnit.id}>
        <div className="font-black">+{combat.reward.xp}XP</div>
        <XpBar unit={xpUnit} xp={combat.reward.xp} />
      </div>
    </div>
  )
}
