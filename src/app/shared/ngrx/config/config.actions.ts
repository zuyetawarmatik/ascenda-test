import { Currency } from 'app/shared/constants'
import { TriggerAction } from 'app/shared/utils/ngrx'

export const ConfigActionTypes = {
  ChangeCurrency: '[Config] Change Currency'
}

export class ChangeCurrency implements TriggerAction {
  readonly type = ConfigActionTypes.ChangeCurrency
  constructor(public payload: Currency) { }
}

export type ConfigActions =
  | ChangeCurrency
