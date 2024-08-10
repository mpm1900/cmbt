import { EncounterChoice } from '@repo/game/types'
import { Button } from '../ui/button'
import { useEncounterContext } from '@/hooks'

export type ChoiceButtonProps = {
  isActive: boolean
  choice: EncounterChoice
  setActiveChoice: (choice: EncounterChoice | undefined) => void
}

export function ChoiceButton(props: ChoiceButtonProps) {
  const { isActive, choice, setActiveChoice } = props
  const ctx = useEncounterContext()
  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      onClick={() => {
        if (choice.resolve) {
          choice.resolve(ctx)
          setActiveChoice(undefined)
        } else {
          setActiveChoice(choice)
        }
      }}
    >
      {choice.label}
    </Button>
  )
}
