import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Hotel, Price } from 'app/shared/models'

@Injectable()
export class HomeService {
  constructor(
    private _http: HttpClient
  ) { }

  searchHotel(keyword: string): Observable<Hotel[]> {
    return this._http.get<Hotel[]>(`/hotels/${keyword}`)
  }

  getHotelPrices(keyword: string, currency: string): Observable<Price[]> {
    return this._http.get<Price[]>(`/hotels/${keyword}/1/${currency}`)
  }
}

