import {
  SimpleReadState
} from 'app/shared/utils/ngrx'
import { Currency } from 'app/shared/constants'

import { ConfigActions, ConfigActionTypes } from './config.actions'

export interface ConfigState {
  currency: SimpleReadState<Currency>
}

export const CONFIG_INITIAL_STATE: ConfigState = {
  currency: {
    data: Currency.USD
  }
}

const {
  ChangeCurrency
} = ConfigActionTypes

export function configReducer(
  state = CONFIG_INITIAL_STATE,
  action: ConfigActions
): ConfigState {
  switch (action.type) {
    case ChangeCurrency:
      return { ...state, currency: { data: action.payload } }

    default:
      return state
  }
}
