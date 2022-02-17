import { Currency } from 'app/shared/constants'
import { MOCK_PRICES_SGD } from 'app/shared/testing/mockObjects'

import { CurrencyFormatPipe } from './currency.pipe'

describe(CurrencyFormatPipe.name, () => {
  let pipe: CurrencyFormatPipe

  beforeEach(() => {
    pipe = new CurrencyFormatPipe('en-US')
  })

  it('should return correct formatted price', () => {
    expect(pipe.transform(123.22, Currency.USD)).toEqual('$123')
    expect(pipe.transform(134322.50, Currency.KRW)).toEqual('₩134300')
    expect(pipe.transform(null, Currency.KRW)).toEqual(null)
  })
})
