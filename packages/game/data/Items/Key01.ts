import { nanoid } from 'nanoid'
import { Item } from '../../types'

export const Key01Id = nanoid()
export const Key01 = (): Item => ({
  id: Key01Id,
  rtid: nanoid(),
  name: 'Key - 01',
  cost: 50,
})
