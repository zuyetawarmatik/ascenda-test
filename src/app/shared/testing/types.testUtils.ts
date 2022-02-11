import { UsersListState, USERS_LIST_INITIAL_STATE } from 'app/features/in/users/list/ngrx/users-list.reducer'
import { RootState, ROOT_INITIAL_STATE } from 'app/shared/ngrx/reducers'

export interface FeaturesState {
  usersList: UsersListState
}

export type AllState = RootState & FeaturesState

export const ALL_INITIAL_STATE: AllState = {
  ...ROOT_INITIAL_STATE,
  usersList: USERS_LIST_INITIAL_STATE
}
