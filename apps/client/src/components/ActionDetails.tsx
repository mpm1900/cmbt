import { ActionRenderers } from '@/renderers'
import { Action } from '@repo/game/types'
import { Separator } from './ui/separator'

export type UnitActionDetailsProps = {
  action: Action
}

export function ActionDetails(props: UnitActionDetailsProps) {
  const { action } = props
  const renderer = ActionRenderers[action.id]

  return (
    <div>
      <div>{renderer?.description(action)}</div>
      {renderer?.help && (
        <div className="text-sm text-muted-foreground/80 italic">
          {renderer?.help(action)}
        </div>
      )}

      <div className="flex my-4 flex-row">
        <Separator className="" />
        <span>targets</span>
        <Separator className="" />
      </div>
      {renderer.lore && (
        <>
          <div className="text-center text-sm text-muted-foreground/70 italic mb-4">
            {renderer.lore(action)}
          </div>
        </>
      )}
    </div>
  )
}
