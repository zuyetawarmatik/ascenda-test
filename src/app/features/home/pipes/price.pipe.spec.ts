import { MOCK_PRICES_SGD } from 'app/shared/testing/mockObjects'

import { PricePipe } from './price.pipe'

describe(PricePipe.name, () => {
  let pipe: PricePipe

  beforeEach(() => {
    pipe = new PricePipe()
  })

  it('should return correct price', () => {
    expect(pipe.transform(1, MOCK_PRICES_SGD, 'own')).toEqual(164)
    expect(pipe.transform(9, MOCK_PRICES_SGD, 'own')).toBeNull()
  })

  it('should return correct comp price (max and more expensive)', () => {
    expect(pipe.transform(7, MOCK_PRICES_SGD, 'comp')).toBeNull()
    expect(pipe.transform(1, MOCK_PRICES_SGD, 'comp')).toEqual(190)
    expect(pipe.transform(2, MOCK_PRICES_SGD, 'comp')).toBeNull()
  })

  it('should return correct comp price list (including self, sorted descending)', () => {
    expect(pipe.transform(7, MOCK_PRICES_SGD, 'compList')).toBeNull()
    expect(pipe.transform(1, MOCK_PRICES_SGD, 'compList')).toEqual([
      { name: 'Traveloka', price: 190 },
      { price: 164 },
      { name: 'Expedia', price: 163 }
    ])
  })

  it('should return correct tax', () => {
    expect(pipe.transform(4, MOCK_PRICES_SGD, 'tax')).toBeUndefined()
    expect(pipe.transform(1, MOCK_PRICES_SGD, 'tax')).toEqual({
      tax: 13.12,
      hotel_fees: 16.4
    })
  })

  it('should return correct save % (comp price more expensive)', () => {
    expect(pipe.transform(1, MOCK_PRICES_SGD, 'save')).toEqual(Math.round(26 / 190 * 100))
    expect(pipe.transform(2, MOCK_PRICES_SGD, 'save')).toBeNull()
    expect(pipe.transform(7, MOCK_PRICES_SGD, 'save')).toBeNull()
  })
})
