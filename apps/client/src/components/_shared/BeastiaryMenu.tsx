import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Beastiary } from './Beastiary'

export function BeastiaryMenu() {
  return (
    <Dialog>
      <DialogTrigger className="text-sm px-2">Beastiary</DialogTrigger>

      <DialogContent className="max-h-full md:max-h-[calc(100%-96px)] min-w-full lg:min-w-[960px] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Beastiary</DialogTitle>
          <DialogDescription>
            Information about various units in the game
          </DialogDescription>
        </DialogHeader>
        <Beastiary />
      </DialogContent>
    </Dialog>
  )
}
