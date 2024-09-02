import { Unit } from '../../../types'
import { ZERO_UNIT } from './ZERO_UNIT'

export const BASE_UNIT: Unit = {
  ...ZERO_UNIT,
  stats: {
    ...ZERO_UNIT.stats,

    arcaneExpansion: 100,
    fireExpansion: 100,
    forceExpansion: 100,
    psychicExpansion: 100,
    shockExpansion: 100,
  },
}
