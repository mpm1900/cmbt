import { ActionStore } from '@/hooks/state'
import { SetIsActive } from '@repo/game/data'
import { ActionsQueueItem } from '@repo/game/types'
import { nanoid } from 'nanoid'

export function consolidateSetActiveActions(
  store: ActionStore
): ActionsQueueItem {
  return {
    id: nanoid(),
    action: new SetIsActive('', 1),
    targetIds: store.queue.flatMap((i) => i.targetIds),
  }
}
