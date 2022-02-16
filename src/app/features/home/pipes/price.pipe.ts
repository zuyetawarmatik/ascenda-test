import { Pipe, PipeTransform } from '@angular/core'

import { Nullable } from 'app/shared/utils/types'

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(id: string, priceData: Nullable<any[]>, type: 'own' | 'comp'): Nullable<any> {
    const priceObj = priceData?.find(x => x.id === id)

    if (!priceObj) return null

    switch (type) {
      case 'own': return priceObj.price
      case 'comp': {
        if (!priceObj.competitors) return null
        return Math.max(...Object.values(priceObj.competitors) as number[])
      }
    }
  }
}
