import { testDispatchEffect } from 'app/shared/utils/testing/effect.testUtils'

import { HomeService } from '../home.service'
import {
  SearchHotel, SearchHotelSuccess, SearchHotelFailure,
  GetHotelPrices, GetHotelPricesSuccess, GetHotelPricesFailure
} from './home.actions'
import { HomeEffects } from './home.effects'

describe(HomeEffects.name, () => {
  const keyword = 'keyword'
  const currency = 'USD'
  const searchHotelPayload = [keyword]
  const getHotelPricesPayload = [keyword, currency]

  const providers = [{ provide: HomeService, useValue: {} }]

  testDispatchEffect({
    effects: HomeEffects,
    effectKey: 'searchHotel$',
    providers,
    service: HomeService,
    serviceFnKey: 'searchHotel',
    testedServiceParams: [keyword],
    triggerActionConstructor: SearchHotel,
    triggerActionConstructorParams: [searchHotelPayload],
    successActionConstructor: SearchHotelSuccess,
    failureActionConstructor: SearchHotelFailure
  })

  testDispatchEffect({
    effects: HomeEffects,
    effectKey: 'getHotelPrices$',
    providers,
    service: HomeService,
    serviceFnKey: 'getHotelPrices',
    testedServiceParams: [keyword, currency],
    triggerActionConstructor: GetHotelPrices,
    triggerActionConstructorParams: [getHotelPricesPayload],
    successActionConstructor: GetHotelPricesSuccess,
    failureActionConstructor: GetHotelPricesFailure
  })
})
