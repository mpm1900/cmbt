import { InvertSpeedAll, TrickRoomId } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const TrickRoomRenderer: ActionRenderer = {
  name: ACTION_NAMES[TrickRoomId],
  description: (action, props) => (
    <>
      Applies{' '}
      <ModifierInline side={props?.side} modifier={new InvertSpeedAll({})} /> to
      all units.
    </>
  ),
}
