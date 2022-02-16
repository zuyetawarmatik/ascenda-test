import { Currency } from 'app/shared/constants'
import { TriggerAction } from 'app/shared/utils/ngrx'

export const ConfigActionTypes = {
  ChangeCurrency: '[Config] Change Currency',
  PersistConfig: '[Config] Persist Config',
  RehydrateConfig: '[Config] Rehydrate Config'
}

export class ChangeCurrency implements TriggerAction {
  readonly type = ConfigActionTypes.ChangeCurrency
  constructor(public payload: Currency) { }
}

export class PersistConfig implements TriggerAction {
  readonly type = ConfigActionTypes.PersistConfig
}

export class RehydrateConfig implements TriggerAction {
  readonly type = ConfigActionTypes.RehydrateConfig
  constructor(public payload: unknown) { }
}

export type ConfigActions =
  | ChangeCurrency
  | PersistConfig
  | RehydrateConfig
