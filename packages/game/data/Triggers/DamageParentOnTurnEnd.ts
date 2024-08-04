import {
  GameContext,
  Modifier,
  Trigger,
  TriggerId,
  TriggerProps,
  Unit,
} from '../../types'

export const DamageParentOnTurnEndId = TriggerId()

export class DamageParentOnTurnEnd extends Trigger {
  private damage: number

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })
    this.damage = props.damage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
