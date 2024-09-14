import { nanoid } from 'nanoid'
import { UnitTag } from '../../types'

export const BeastId = nanoid()
export const Beast: UnitTag = {
  id: BeastId,
  label: 'Beast',
}

export const FlyingId = nanoid()
export const Flying: UnitTag = {
  id: FlyingId,
  label: 'Flying',
}
