import { Injectable } from '@angular/core'

import { EffectFactory } from 'app/shared/services/effect.factory'

import { HomeService } from '../home.service'
import {
  SearchHotel, SearchHotelSuccess, SearchHotelFailure,
  GetHotelPrices, GetHotelPricesSuccess, GetHotelPricesFailure,
  HomeActionTypes
} from './home.actions'

@Injectable()
export class HomeEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _homeService: HomeService
  ) { }

  searchHotel$ = this._effectFactory.createDispatch<SearchHotel, SearchHotelSuccess, SearchHotelFailure>({
    triggerActionType: HomeActionTypes.SearchHotel,
    successActionConstructor: SearchHotelSuccess,
    failureActionConstructor: SearchHotelFailure,
    serviceCallback: action => this._homeService.searchHotel(action.payload[0])
  })

  getHotelPrices$ = this._effectFactory.createDispatch<GetHotelPrices, GetHotelPricesSuccess, GetHotelPricesFailure>({
    triggerActionType: HomeActionTypes.GetHotelPrices,
    successActionConstructor: GetHotelPricesSuccess,
    failureActionConstructor: GetHotelPricesFailure,
    serviceCallback: action => this._homeService.getHotelPrices(action.payload[0], action.payload[1])
  })
}
