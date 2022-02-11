import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class HomeService {
  constructor(
    private _http: HttpClient
  ) { }

  searchHotel(keyword: string): Observable<unknown> {
    return this._http.get(`/hotels/${keyword}`)
  }

  getHotelPrices(keyword: string, currency: string): Observable<unknown> {
    return this._http.get(`/hotels/${keyword}/1/${currency}`)
  }
}

