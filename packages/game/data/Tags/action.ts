import { nanoid } from 'nanoid'
import { Tag } from '../../types'

export const GroundBasedId = nanoid()
export const GroundBased: Tag = {
  id: GroundBasedId,
  label: 'Ground-based',
}
