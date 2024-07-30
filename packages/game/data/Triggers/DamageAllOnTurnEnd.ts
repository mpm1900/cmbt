import {
  GameContext,
  Modifier,
  Trigger,
  TriggerId,
  TriggerProps,
  Unit,
} from '../../types'

export const DamageAllOnTurnEndId = TriggerId()
export const BurnDamageOnTurnEndId = TriggerId()

export class DamageAllOnTurnEnd extends Trigger {
  private damage: number

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })
    this.damage = props.damage
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx)
  }
}
