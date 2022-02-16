import { CurrencyPipe } from '@angular/common'
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core'

import { CURRENCIES, Currency } from 'app/shared/constants'

@Pipe({
  name: 'currencyFmt'
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) private _locale: string
  ) {}

  transform(
    price: number,
    currency: Currency
  ): string | null {
    const currencyObj = CURRENCIES[currency]
    let roundedPrice = price
    if (currencyObj.decimalDigits === 2) {
      roundedPrice = Math.round(price)
    } else {
      roundedPrice = Math.round(price / 100) * 100
    }
    return (new CurrencyPipe(this._locale)).transform(roundedPrice, currencyObj.code, undefined, '1.0-0')
  }
}
