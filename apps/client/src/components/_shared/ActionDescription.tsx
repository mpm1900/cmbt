import { ActionRenderers } from '@/renderers'
import { Action } from '@repo/game/types'

export type ActionDescriptionProps = {
  action: Action
}

export function ActionDescription(props: ActionDescriptionProps) {
  const { action } = props
  const renderer = ActionRenderers[action.id]

  return (
    <div className="text-muted-foreground">{renderer.description(action)}</div>
  )
}
