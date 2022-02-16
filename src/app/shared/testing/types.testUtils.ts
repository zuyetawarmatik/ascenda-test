import { HomeState, HOME_INITIAL_STATE } from 'app/features/home/ngrx/home.reducer'
import { RootState, ROOT_INITIAL_STATE } from 'app/shared/ngrx/reducers'

export interface FeaturesState {
  home: HomeState
}

export type AllState = RootState & FeaturesState

export const ALL_INITIAL_STATE: AllState = {
  ...ROOT_INITIAL_STATE,
  home: HOME_INITIAL_STATE
}
