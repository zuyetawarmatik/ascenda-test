// Excerpt from https://github.com/leequixxx/currencies.json/blob/master/currencies.json

export enum Currency {
  CNY = 'CNY',
  IDR = 'IDR',
  JPY = 'JPY',
  KRW = 'KRW',
  SGD = 'SGD',
  USD = 'USD'
}

export const CURRENCIES: {
  [k in Currency]: {
    name: string,
    symbol: string,
    symbolNative: string,
    decimalDigits: number,
    rounding: number,
    code: string,
    namePlural: string
  }
} = {
  CNY: {
    name: 'Chinese Yuan',
    symbol: 'CN¥',
    symbolNative: 'CN¥',
    decimalDigits: 2,
    rounding: 0,
    code: 'CNY',
    namePlural: 'Chinese yuan'
  },
  IDR: {
    name: 'Indonesian Rupiah',
    symbol: 'Rp',
    symbolNative: 'Rp',
    decimalDigits: 0,
    rounding: 0,
    code: 'IDR',
    namePlural: 'Indonesian rupiahs'
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
    symbolNative: '￥',
    decimalDigits: 0,
    rounding: 0,
    code: 'JPY',
    namePlural: 'Japanese yen'
  },
  KRW: {
    name: 'South Korean Won',
    symbol: '₩',
    symbolNative: '₩',
    decimalDigits: 0,
    rounding: 0,
    code: 'KRW',
    namePlural: 'South Korean won'
  },
  SGD: {
    name: 'Singapore Dollar',
    symbol: 'S$',
    symbolNative: '$',
    decimalDigits: 2,
    rounding: 0,
    code: 'SGD',
    namePlural: 'Singapore dollars'
  },
  USD: {
    name: 'US Dollar',
    symbol: '$',
    symbolNative: '$',
    decimalDigits: 2,
    rounding: 0,
    code: 'USD',
    namePlural: 'US dollars'
  }
}
