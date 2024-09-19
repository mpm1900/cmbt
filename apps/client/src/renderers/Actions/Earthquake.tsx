import { EarthquakeId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const EarthquakeRenderer: ActionRenderer = {
  name: ACTION_NAMES[EarthquakeId],
  description: (action) => (
    <>
      Deals <DamageListInline damages={action.damages} /> to all other units.
    </>
  ),
}
