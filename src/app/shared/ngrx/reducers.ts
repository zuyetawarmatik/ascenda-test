import { ActionReducerMap } from '@ngrx/store'

import { configReducer, ConfigState, CONFIG_INITIAL_STATE } from './config/config.reducer'

export interface RootState {
  config: ConfigState
}

const reducers: ActionReducerMap<RootState, any> = {
  config: configReducer
}

export const ROOT_INITIAL_STATE: RootState = {
  config: CONFIG_INITIAL_STATE
}

export default reducers

