import { useCombatContext, useCombatToWorldState } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { isUnitAliveCtx } from '@repo/game/utils'
import { IoMdReturnRight } from 'react-icons/io'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { CombatRewardsPreview } from './CombatRewardsPreview'

export function CombatComplete() {
  const { commit: shouldCommit, onSuccess, onFailure } = useCombat()
  const ctx = useCombatContext()
  const commit = useCombatToWorldState()
  const aliveUserUnits = ctx.units.filter(
    (u) => u.teamId === ctx.user && isUnitAliveCtx(u, ctx)
  )
  const success = aliveUserUnits.length !== 0

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Battle Complete</CardTitle>
      </CardHeader>
      <CardContent>
        {success && <CombatRewardsPreview />}
        {!success && <div>You lose</div>}
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => {
            if (shouldCommit) {
              commit()
            }
            if (success) {
              onSuccess()
            }
            if (!success) {
              onFailure()
            }
          }}
          className="space-x-2"
        >
          <div>Continue</div>
          <IoMdReturnRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
