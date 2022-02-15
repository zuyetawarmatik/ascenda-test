import { Pipe, PipeTransform } from '@angular/core'

import { Nullable } from 'app/shared/utils/types'

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(id: string, priceData: Nullable<any[]>): string {
    return priceData ? priceData.find(x => x.id === id).price : ''
  }
}
