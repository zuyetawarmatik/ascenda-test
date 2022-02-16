import {
  SimpleReadState
} from 'app/shared/utils/ngrx'
import { Currency } from 'app/shared/constants'

import {
  ChangeCurrency as ChangeCurrencyAction,
  ConfigActions, ConfigActionTypes,
  RehydrateConfig as RehydrateConfigAction
} from './config.actions'

export interface ConfigState {
  currency: SimpleReadState<Currency>
}

export const CONFIG_INITIAL_STATE: ConfigState = {
  currency: {
    data: Currency.USD
  }
}

const {
  ChangeCurrency,
  RehydrateConfig
} = ConfigActionTypes

export function configReducer(
  state = CONFIG_INITIAL_STATE,
  action: ConfigActions
): ConfigState {
  switch (action.type) {
    case ChangeCurrency:
      return { ...state, currency: { data: (action as ChangeCurrencyAction).payload } }

    case RehydrateConfig:
      return { ...(action as RehydrateConfigAction).payload as ConfigState }

    default:
      return state
  }
}
