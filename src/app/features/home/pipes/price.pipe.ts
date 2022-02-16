import { Pipe, PipeTransform } from '@angular/core'

import { Price, PriceList } from 'app/shared/models'
import { Nullable } from 'app/shared/utils/types'

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(
    id: number,
    priceData: Nullable<Price[]>,
    type: 'own' | 'comp' | 'compList' | 'tax' | 'save'

  ): Nullable<number | Price['taxes_and_fees'] | PriceList> {
    const priceObj = priceData?.find(x => x.id === id)

    if (!priceObj) return null

    switch (type) {
      case 'own':
        return priceObj.price
      case 'comp': {
        if (!priceObj.competitors) return null
        const price = this.transform(id, priceData, 'own') as number
        const comps = Object.values(priceObj.competitors) as number[]
        const maxComp = Math.max(...comps)
        return maxComp > price ? maxComp : null
      }
      case 'compList': {
        if (!priceObj.competitors) return null
        const priceList: PriceList = Object.keys(priceObj.competitors).map(key => ({
          name: key,
          price: priceObj.competitors[key]
        }))
        priceList.push({ price: priceObj.price })
        return priceList.sort((a, b) =>b.price - a.price)
      }
      case 'tax':
        return priceObj.taxes_and_fees
      case 'save': {
        const price = this.transform(id, priceData, 'own') as number
        const comp = this.transform(id, priceData, 'comp') as number
        return comp && comp
          ? Math.round((comp - price) / comp * 100)
          : null
      }
    }
  }
}
