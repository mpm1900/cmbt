import { EncounterChoice } from '@repo/game/types'
import { Button } from '../ui/button'
import { useEncounterContext } from '@/hooks'

export type ChoiceButtonProps = {
  choice: EncounterChoice
}

export function ChoiceButton(props: ChoiceButtonProps) {
  const { choice } = props
  const ctx = useEncounterContext()
  return (
    <Button
      variant={'secondary'}
      onClick={() => {
        choice.resolve(ctx)
      }}
    >
      {choice.label}
    </Button>
  )
}
