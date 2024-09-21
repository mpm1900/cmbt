import { nanoid } from 'nanoid'
import { Tag } from '../../types'

export const BeastId = nanoid()
export const Beast: Tag = {
  id: BeastId,
  label: 'Beast',
}

export const FlyingId = nanoid()
export const Flying: Tag = {
  id: FlyingId,
  label: 'Flying',
}
