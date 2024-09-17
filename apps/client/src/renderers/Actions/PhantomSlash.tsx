import { PhantomSlashId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PhantomSlashRender: ActionRenderer = {
  name: ACTION_NAMES[PhantomSlashId],
  description: (a, props) => {
    return <>Does the thing.</>
  },
}
