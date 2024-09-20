import { nanoid } from 'nanoid'
import { Item } from '../../types'

export const MysteriousOrbId = nanoid()
export const MysteriousOrbKey = nanoid()
export const MysteriousOrb: Item = {
  id: MysteriousOrbId,
  rtid: nanoid(),
  name: 'Mysterious Orb',
  cost: 1800,
  rarity: 'legendary',
  key: MysteriousOrbKey,
}
