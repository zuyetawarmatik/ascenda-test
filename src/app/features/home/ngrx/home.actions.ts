import { TriggerAction, ResultAction } from 'app/shared/utils/ngrx'

export const HomeActionTypes = {
  SearchHotel: '[Home] Search Hotel',
  SearchHotelSuccess: '[Home] Search Hotel Success',
  SearchHotelFailure: '[Home] Search Hotel Failure',
  GetHotelPrices: '[Home] Get Hotel Prices',
  GetHotelPricesSuccess: '[Home] Get Hotel Prices Success',
  GetHotelPricesFailure: '[Home] Get Hotel Prices Failure'
}

type SearchHotelPayload = [keyword: string]
type GetHotelPricesPayload = [keyword: string, currency: string]

export class SearchHotel implements TriggerAction {
  readonly type = HomeActionTypes.SearchHotel
  constructor(public payload: SearchHotelPayload) { }
}

export class SearchHotelSuccess implements ResultAction<SearchHotel> {
  readonly type = HomeActionTypes.SearchHotelSuccess
  constructor(public triggerAction: SearchHotel, public payload: unknown) { }
}

export class SearchHotelFailure implements ResultAction<SearchHotel> {
  readonly type = HomeActionTypes.SearchHotelFailure
  constructor(public triggerAction: SearchHotel, public payload: unknown) { }
}

export class GetHotelPrices implements TriggerAction {
  readonly type = HomeActionTypes.GetHotelPrices
  constructor(public payload: GetHotelPricesPayload) { }
}

export class GetHotelPricesSuccess implements ResultAction<GetHotelPrices> {
  readonly type = HomeActionTypes.GetHotelPricesSuccess
  constructor(public triggerAction: GetHotelPrices, public payload: unknown) { }
}

export class GetHotelPricesFailure implements ResultAction<GetHotelPrices> {
  readonly type = HomeActionTypes.GetHotelPricesFailure
  constructor(public triggerAction: GetHotelPrices, public payload: unknown) { }
}

export type HomeActions =
  | SearchHotel
  | SearchHotelSuccess
  | SearchHotelFailure
  | GetHotelPrices
  | GetHotelPricesSuccess
  | GetHotelPricesFailure
