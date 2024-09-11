import { useEncounterContext } from '@/hooks'
import { EncounterChoice } from '@repo/game/types'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

export type ChoiceButtonProps = {
  choice: EncounterChoice
  index: number
}

export function ChoiceButton(props: ChoiceButtonProps) {
  const { choice, index } = props
  const ctx = useEncounterContext()
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button
        className="w-full justify-start flex items-center space-x-2 text-muted-foreground hover:text-white"
        disabled={choice.disabled}
        variant={'ghost'}
        onClick={() => {
          choice.resolve(ctx)
        }}
      >
        <span className="font-thin">{index + 1})</span>{' '}
        <span className="font-normal">{choice.label}</span>
      </Button>
    </motion.div>
  )
}
