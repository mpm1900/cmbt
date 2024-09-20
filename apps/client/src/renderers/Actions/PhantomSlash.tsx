import { IntangibleParent, PhantomSlash, PhantomSlashId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PhantomSlashRender: ActionRenderer = {
  name: ACTION_NAMES[PhantomSlashId],
  description: (a, props) => {
    const action = a as PhantomSlash
    return (
      <>
        This unit gains{' '}
        <ModifierInline
          modifier={
            new IntangibleParent({
              duration: 2,
            })
          }
        />
        . On the next turn, deals <DamageListInline damages={action.damages} />{' '}
        to target active enemy. This action takes 2 turns.
      </>
    )
  },
  successLog(result) {
    if (!result.source) return undefined
    return <>{result.source.name} faded away.</>
  },
}

export const PhantomSlashStagedRenderer: ActionRenderer = {
  name: ACTION_NAMES[PhantomSlashId],
  description: (a, props) => {
    const action = a as PhantomSlash
    return (
      <>
        This unit gains{' '}
        <ModifierInline
          modifier={
            new IntangibleParent({
              duration: 2,
            })
          }
        />
        . On the next turn, deals <DamageListInline damages={action.damages} />{' '}
        to target active enemy. This action takes 2 turns.
      </>
    )
  },
}
