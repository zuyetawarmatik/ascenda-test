import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { NgLetModule } from 'ng-let'
import { TooltipModule } from 'ng2-tooltip-directive'
import { BehaviorSubject } from 'rxjs'
import { SinonSpy, spy } from 'sinon'

import { SharedModule } from 'app/shared/modules/shared.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { updateStoreAndFixture, updateSubjectAndFixture } from 'app/shared/utils/testing/general.testUtils'
import { MOCK_HOTELS, MOCK_PRICES_SGD, MOCK_PRICES_USD } from 'app/shared/testing/mockObjects'

import { HomeComponent } from './home.component'
import { GetHotelPrices, SearchHotel, SearchHotelSuccess } from './ngrx/home.actions'
import { CurrencyFormatPipe } from './pipes/currency.pipe'
import { PricePipe } from './pipes/price.pipe'

const cls = '.home'
const formCls = `${cls}-form`
const formKeywordCls = `${formCls}-keyword`
const formSubmitBtnCls = `${formCls}-submit-btn`
const currencyBtnCls = `${cls}-currency-btn`
const resultsCls = `${cls}-results`
const resultsEmptyCls = `${resultsCls}-empty`
const resultItemCls = `${cls}-result-item`
const resultItemImgCls = `${resultItemCls}-img`
const resultItemInfoCls = `${resultItemCls}-info`
const resultItemInfoStarsCls = `${resultItemInfoCls}-stars`
const resultItemInfoAddressCls = `${resultItemInfoCls}-address`
const resultItemInfoRatingCls = `${resultItemInfoCls}-rating`
const resultItemInfoPriceCls = `${resultItemInfoCls}-price`
const resultItemInfoPriceLoadingSpinnerCls = `${resultItemInfoPriceCls}-loading-spinner`
const resultItemInfoPriceEmptyCls = `${resultItemInfoPriceCls}-empty`
const resultItemInfoCompCls = `${resultItemInfoCls}-comp`
const resultItemInfoCompSavingCls = `${resultItemInfoCompCls}-saving`
const resultItemInfoCompPriceCls = `${resultItemInfoCompCls}-price`
const resultItemInfoTaxFeesCls = `${resultItemInfoCls}-tax-fees`
const matSpinnerSel = 'mat-spinner'

fdescribe(HomeComponent.name, () => {
  const keyword = 'tokyo'
  const newCurrency = 'SGD'

  const imports = [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    NgLetModule,
    TooltipModule,
    SharedModule
  ]

  const initialState = ALL_INITIAL_STATE
  const currency = initialState.config.currency.data!

  const newCurrencyState = {
    ...initialState,
    config: {
      ...initialState.config,
      currency: {
        ...initialState.config.currency,
        data: newCurrency
      }
    }
  }

  const loadingHotelsState = {
    ...initialState,
    home: {
      ...initialState.home,
      searchHotel: {
        ...initialState.home.searchHotel,
        [keyword]: {
          isProcessing: true
        }
      }
    }
  }

  const loadedHotelsState = {
    ...initialState,
    home: {
      ...initialState.home,
      searchHotel: {
        ...initialState.home.searchHotel,
        [keyword]: {
          data: MOCK_HOTELS
        }
      }
    }
  }

  const loadingPricesUSDState = {
    ...loadedHotelsState,
    home: {
      ...loadedHotelsState.home,
      getHotelPrices: {
        ...loadedHotelsState.home.getHotelPrices,
        [keyword]: {
          [currency as string]: {
            isProcessing: true
          }
        }
      }
    }
  }

  const loadedPricesUSDState = {
    ...loadedHotelsState,
    home: {
      ...loadedHotelsState.home,
      getHotelPrices: {
        ...loadedHotelsState.home.getHotelPrices,
        [keyword]: {
          [currency as string]: {
            data: MOCK_PRICES_USD
          }
        }
      }
    }
  }

  const loadedPricesSGDState = {
    ...loadedHotelsState,
    config: {
      ...loadedHotelsState.config,
      currency: {
        ...loadedHotelsState.config.currency,
        data: newCurrency
      }
    },
    home: {
      ...loadedHotelsState.home,
      getHotelPrices: {
        ...loadedHotelsState.home.getHotelPrices,
        [keyword]: {
          [newCurrency]: {
            data: MOCK_PRICES_SGD
          }
        }
      }
    }
  }

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<HomeComponent>

  let container: any
  let fixture: ComponentFixture<HomeComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  beforeEach(async () => {
    stubActions$ = new BehaviorSubject({})
    mockActionsProvider = {
      provide: Actions,
      useValue: stubActions$.asObservable()
    }

    providers = [
      { provide: LOCALE_ID, useValue: 'en-US' },
      provideMockStore({ initialState }),
      mockActionsProvider
    ]

    renderOptions = {
      imports,
      providers,
      declarations: [CurrencyFormatPipe, PricePipe],
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container, fixture } = await render(HomeComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  it('should show empty result with initial currency', () => {
    expect(container.querySelector(resultsEmptyCls)).toBeTruthy()
    expect(container.querySelector(currencyBtnCls).innerText).toEqual(currency)
  })

  it('should perform form validations', () => {
    expect(container.querySelector(formSubmitBtnCls).disabled).toBeTrue()
    userEvent.type(container.querySelector(formKeywordCls).querySelector('input'), keyword)
    fireEvent.blur(container.querySelector(formKeywordCls).querySelector('input'))
    expect(container.querySelector(formSubmitBtnCls).disabled).toBeFalse()
  })

  describe('when form is filled', () => {
    beforeEach(async () => {
      // Trigger searchedKeyword$ change
      userEvent.type(container.querySelector(formKeywordCls).querySelector('input'), keyword)
      fireEvent.click(container.querySelector(formSubmitBtnCls))
      await fixture.whenStable()
    })

    it(`should dispatch ${SearchHotel.name} when submitting form`, () => {
      expect(spyStoreDispatch.lastCall.args).toEqual([new SearchHotel([keyword])])
    })

    it('should disable form, Submit button when in progress', () => {
      expect(container.querySelector(formSubmitBtnCls).disabled).toBeFalse()
      expect(container.querySelector(formSubmitBtnCls).querySelector(matSpinnerSel)).toBeFalsy()

      updateStoreAndFixture(store, loadingHotelsState, fixture)
      container.querySelector(formCls).querySelectorAll('input').forEach((el: any) => {
        expect(el.disabled).toBeTrue()
      })
      expect(container.querySelector(formSubmitBtnCls).disabled).toBeTrue()
      expect(container.querySelector(formSubmitBtnCls).querySelector(matSpinnerSel)).toBeTruthy()
    })

    it(`should dispatch ${GetHotelPrices.name} when ${SearchHotelSuccess.name} or currency changed`, () => {
      updateSubjectAndFixture(stubActions$, new SearchHotelSuccess(new SearchHotel([keyword]), {}), fixture)
      expect(spyStoreDispatch.lastCall.args).toEqual([new GetHotelPrices([keyword, currency as string])])

      updateStoreAndFixture(store, newCurrencyState, fixture)
      expect(spyStoreDispatch.lastCall.args).toEqual([new GetHotelPrices([keyword, newCurrency])])
    })

    describe('when data is loaded', () => {
      const currencyFormatPipe = new CurrencyFormatPipe('en-US')
      const pricePipe = new PricePipe()

      let resultItems: any[]

      beforeEach(() => {
        updateStoreAndFixture(store, loadedHotelsState, fixture)
      })

      it('should show result with price not available yet', () => {
        resultItems = container.querySelectorAll(resultItemCls)
        expect(container.querySelector(resultsEmptyCls)).toBeFalsy()
        expect(resultItems.length).toEqual(MOCK_HOTELS.length)
        resultItems.forEach((item, i) => {
          const hotel = MOCK_HOTELS[i]
          expect(item.querySelector(resultItemImgCls).src).toEqual(hotel.photo)
          expect(item.querySelector(resultItemInfoAddressCls).innerText).toEqual(hotel.address)
          expect(item.querySelector(resultItemInfoRatingCls).innerText).toEqual(`${hotel.rating}`)
          expect(item.querySelector(resultItemInfoPriceEmptyCls)).toBeTruthy()
          expect(item.querySelector(resultItemInfoPriceLoadingSpinnerCls)).toBeFalsy()
          expect(item.querySelector(resultItemInfoStarsCls).querySelectorAll('img').length).toEqual(hotel.stars)
        })
      })

      it('should show price loading', () => {
        updateStoreAndFixture(store, loadingPricesUSDState, fixture)
        resultItems = container.querySelectorAll(resultItemCls)
        resultItems.forEach((item) => {
          expect(item.querySelector(resultItemInfoPriceEmptyCls)).toBeFalsy()
          expect(item.querySelector(resultItemInfoPriceLoadingSpinnerCls)).toBeTruthy()
        })
      })

      it('should show price when available', () => {
        updateStoreAndFixture(store, loadedPricesUSDState, fixture)
        resultItems = container.querySelectorAll(resultItemCls)
        resultItems.forEach((item, i) => {
          const hotel = MOCK_HOTELS[i]
          const price = MOCK_PRICES_USD.find(x => x.id === hotel.id)
          expect(item.querySelector(resultItemInfoPriceEmptyCls)).toBeFalsy()
          expect(item.querySelector(resultItemInfoPriceLoadingSpinnerCls)).toBeFalsy()
          expect(item.querySelector(resultItemInfoPriceCls).innerText).toEqual(currencyFormatPipe.transform(price?.price, currency))

          if (price?.competitors) {
            const compPrice = pricePipe.transform(hotel.id, MOCK_PRICES_USD, 'comp')
            const saving = pricePipe.transform(hotel.id, MOCK_PRICES_USD, 'save')
            expect(item.querySelector(resultItemInfoCompSavingCls).innerText.trim()).toEqual(`(Save ${saving}%)`)
            expect(item.querySelector(resultItemInfoCompPriceCls).innerText)
              .toEqual(currencyFormatPipe.transform(compPrice as number, currency))
          } else {
            expect(item.querySelector(resultItemInfoCompCls)).toBeFalsy()
          }
        })
      })

      it('should show if tax available', () => {
        updateStoreAndFixture(store, loadedPricesSGDState, fixture)
        resultItems = container.querySelectorAll(resultItemCls)
        resultItems.forEach((item, i) => {
          const hotel = MOCK_HOTELS[i]
          const price = MOCK_PRICES_SGD.find(x => x.id === hotel.id)

          if (price?.taxes_and_fees) {
            expect(item.querySelector(resultItemInfoTaxFeesCls)).toBeTruthy()
          } else {
            expect(item.querySelector(resultItemInfoTaxFeesCls)).toBeFalsy()
          }
        })
      })
    })
  })
})
