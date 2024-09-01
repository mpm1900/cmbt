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
      className="justify-start flex items-center space-x-2 text-muted-foreground hover:text-white"
      variant={'ghost'}
      onClick={() => {
        choice.resolve(ctx)
      }}
    >
      <span>{index + 1})</span> {choice.label}
    </Button>
  )
}
