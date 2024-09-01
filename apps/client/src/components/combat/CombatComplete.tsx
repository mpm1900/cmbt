import { useCombatToWorldState } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

export function CombatComplete() {
  const combat = useCombat()
  const commit = useCombatToWorldState()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Battle over!</CardTitle>
      </CardHeader>
      <CardContent>
        <div>You did it! Here's what you get!</div>
        <div>Nothing.</div>
      </CardContent>
      <CardFooter className="justify-end">
        <Link to="/world">
          <Button
            onClick={() => {
              commit()
              combat.onSuccess()
            }}
          >
            Back to Map
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
