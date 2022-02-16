import { Pipe, PipeTransform } from '@angular/core'

import { Price } from 'app/shared/models'
import { Nullable } from 'app/shared/utils/types'

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(
    id: number,
    priceData: Nullable<Price[]>,
    type: 'own' | 'comp' | 'tax'
  ): Nullable<number | Price['taxes_and_fees']> {
    const priceObj = priceData?.find(x => x.id === id)

    if (!priceObj) return null

    switch (type) {
      case 'own':
        return priceObj.price
      case 'comp': {
        if (!priceObj.competitors) return null
        return Math.max(...Object.values(priceObj.competitors) as number[])
      }
      case 'tax':
        return priceObj.taxes_and_fees
    }
  }
}
