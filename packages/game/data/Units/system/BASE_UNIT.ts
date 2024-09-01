import { Unit } from '../../../types'
import { ZERO_UNIT } from './ZERO_UNIT'

export const BASE_UNIT: Unit = {
  ...ZERO_UNIT,
  stats: {
    ...ZERO_UNIT.stats,

    arcaneExpansion: 1,
    fireExpansion: 1,
    forceExpansion: 1,
    psychicExpansion: 1,
    shockExpansion: 1,
  },
}
