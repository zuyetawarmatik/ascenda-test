import { testReadReducer, testNoopReducer } from 'app/shared/utils/testing/reducer.testUtils'

import {
  SearchHotel, SearchHotelSuccess, SearchHotelFailure,
  GetHotelPrices, GetHotelPricesSuccess, GetHotelPricesFailure
} from './home.actions'
import { homeReducer, HOME_INITIAL_STATE } from './home.reducer'

describe(homeReducer.name, () => {
  const keyword = 'keyword'
  const currency = 'USD'

  describe(`${SearchHotel.name}, ${SearchHotelSuccess.name}, ${SearchHotelFailure.name}`, () => {
    testReadReducer({
      reducer: homeReducer,
      initialState: HOME_INITIAL_STATE,
      stateKey: 'searchHotel',
      stateSubKey: keyword,
      triggerActionConstructor: SearchHotel,
      triggerActionConstructorParams: [[keyword]],
      successActionConstructor: SearchHotelSuccess,
      failureActionConstructor: SearchHotelFailure
    })

    testReadReducer({
      reducer: homeReducer as any,
      initialState: HOME_INITIAL_STATE as any,
      stateKey: 'getHotelPrices',
      stateSubKey: `${keyword}.${currency}`,
      triggerActionConstructor: GetHotelPrices,
      triggerActionConstructorParams: [[keyword, currency]],
      successActionConstructor: GetHotelPricesSuccess,
      failureActionConstructor: GetHotelPricesFailure
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: homeReducer,
      initialState: HOME_INITIAL_STATE
    })
  })
})
