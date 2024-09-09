import { useCombatContext, useCombatToWorldState } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { isUnitAliveCtx } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'
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
  const { onSuccess } = useCombat()
  const ctx = useCombatContext()
  const nav = useNavigate()
  const commit = useCombatToWorldState()
  const aliveUserUnits = ctx.units.filter(
    (u) => u.teamId === ctx.user && isUnitAliveCtx(u.id, ctx)
  )
  if (aliveUserUnits.length === 0) {
    nav({ to: '/' })
  }

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Battle Complete</CardTitle>
      </CardHeader>
      <CardContent>
        <CombatRewardsPreview />
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => {
            commit()
            onSuccess()
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
