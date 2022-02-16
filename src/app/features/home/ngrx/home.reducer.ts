import clone from 'lodash-es/clone'
import get from 'lodash-es/get'
import setWith from 'lodash-es/setWith'

import {
  ReadState,
  readReducer, readSuccessReducer, readFailureReducer,
  ResultAction, TriggerAction
} from 'app/shared/utils/ngrx'
import { Hotel, Price } from 'app/shared/models'

import { HomeActions, HomeActionTypes } from './home.actions'

export interface HomeState {
  searchHotel: {
    [keyword: string]: ReadState<Hotel[]>
  },
  getHotelPrices: {
    [keyword: string]: {
      [currency: string]: ReadState<Price[]>
    }
  }
}

export interface FeatureState {
  home: HomeState
}

export const HOME_INITIAL_STATE: HomeState = {
  searchHotel: {},
  getHotelPrices: {}
}

const {
  SearchHotel, SearchHotelSuccess, SearchHotelFailure,
  GetHotelPrices, GetHotelPricesSuccess, GetHotelPricesFailure
} = HomeActionTypes

// return the array of 2nd-level+ keys, e.g. ['some keyword', 'some currency']
function getSubKey(action: HomeActions): string[] {
  if ((action as ResultAction).triggerAction) {
    return (action as ResultAction).triggerAction.payload
  } else {
    return (action as TriggerAction).payload
  }
}

// return the array of state keys for each action, e.g. ['searchHotel, 'some keyword', 'some currency']
function getKey(action: HomeActions): [keyof HomeState, ...string[]] | undefined {
  switch (action.type) {
    case SearchHotel:
    case SearchHotelSuccess:
    case SearchHotelFailure:
      return ['searchHotel', ...getSubKey(action)]

    case GetHotelPrices:
    case GetHotelPricesSuccess:
    case GetHotelPricesFailure:
      return ['getHotelPrices', ...getSubKey(action)]

    default:
      return undefined
  }
}

export function homeReducer(
  state = HOME_INITIAL_STATE,
  action: HomeActions
): HomeState {
  const key = getKey(action) as string[]
  const newState = { ...state }

  switch (action.type) {
    case SearchHotel:
    case GetHotelPrices:
      setWith(newState, key, readReducer(get(newState, key)), clone)
      return newState

    case SearchHotelSuccess:
    case GetHotelPricesSuccess:
      setWith(newState, key, readSuccessReducer(get(newState, key), action), clone)
      return newState

    case SearchHotelFailure:
    case GetHotelPricesFailure:
      setWith(newState, key, readFailureReducer(get(newState, key), action), clone)
      return newState

    default:
      return state
  }
}
