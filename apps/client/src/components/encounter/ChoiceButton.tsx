import { useEncounterContext } from '@/hooks'
import { EncounterChoice } from '@repo/game/types'
import { Button } from '../ui/button'

export type ChoiceButtonProps = {
  choice: EncounterChoice
  index: number
}

export function ChoiceButton(props: ChoiceButtonProps) {
  const { choice, index } = props
  const ctx = useEncounterContext()
  return (
    <Button
      className="justify-start items-start"
      variant={'ghost'}
      onClick={() => {
        choice.resolve(ctx)
      }}
    >
      {index}. {choice.label}
    </Button>
  )
}
