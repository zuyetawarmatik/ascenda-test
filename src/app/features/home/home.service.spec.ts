import { testServiceHttpFn } from 'app/shared/utils/testing/service.testUtils'

import { HomeService } from './home.service'

describe(HomeService.name, () => {
  const keyword = 'keyword'
  const currency = 'USD'

  testServiceHttpFn({
    service: HomeService,
    serviceFnKey: 'searchHotel',
    serviceFnParams: [keyword],
    httpMethod: 'get',
    testedPath: `/hotels/${keyword}`
  })

  testServiceHttpFn({
    service: HomeService,
    serviceFnKey: 'getHotelPrices',
    serviceFnParams: [keyword, currency],
    httpMethod: 'get',
    testedPath: `/hotels/${keyword}/1/${currency}`
  })
})
