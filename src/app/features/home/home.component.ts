import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'

import { Nullable } from 'app/shared/utils/types'

import { GetHotelPrices, HomeActionTypes, SearchHotel, SearchHotelSuccess } from './ngrx/home.actions'
import { FeatureState } from './ngrx/home.reducer'

@UntilDestroy()
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup

  get keywordCtrl(): FormControl { return this.searchForm.get('keyword') as FormControl }

  private _searchedKeyword = new BehaviorSubject<Nullable<string>>(null)

  isSearchHotelProcessing$!: Observable<boolean>

  searchHotelData$!: Observable<Nullable<any[]>>
  getHotelPricesData$!: Observable<Nullable<any[]>>

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._createForm()
    this._initObservables()
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this._store.dispatch(new SearchHotel([this.keywordCtrl.value]))
      this._searchedKeyword.next(this.keywordCtrl.value)
    }
  }

  private _createForm(): void {
    this.searchForm = this._formBuilder.group({
      keyword: ['tokyo', [Validators.required]]
    })
  }

  private _initObservables(): void {
    this.isSearchHotelProcessing$ = this._searchedKeyword
      .pipe(
        filter(x => !!x),
        switchMap(searchedKeyword => this._store
          .select(s => s.home.searchHotel[searchedKeyword as string]?.isProcessing)
          .pipe(untilDestroyed(this))
        )
      )

    this.isSearchHotelProcessing$
      .pipe(untilDestroyed(this))
      .subscribe(isProcessing => {
        if (isProcessing) {
          this.searchForm.disable()
        } else {
          this.searchForm.enable()
        }
      })

    this.searchHotelData$ = of([
      {
        'id': 1,
        'name': 'Shinagawa Prince Hotel',
        'rating': 7.7,
        'stars': 4,
        'address': '108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan',
        'photo': 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
        'description': '<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>'
      }
    ])

    this.getHotelPricesData$ = of([
      {
        'id': 1,
        'price': 164,
        'competitors': {
          'Traveloka': 190,
          'Expedia': 163
        },
        'taxes_and_fees': {
          'tax': 13.12,
          'hotel_fees': 16.40
        }
      }
    ])

    // this.searchHotelData$ = this._searchedKeyword
    //   .pipe(
    //     filter(x => !!x),
    //     switchMap(searchedKeyword => this._store
    //       .select(s => s.home.searchHotel[searchedKeyword as string]?.data)
    //       .pipe(untilDestroyed(this))
    //     )
    //   )

    // this.getHotelPricesData$ = this._searchedKeyword
    //   .pipe(
    //     filter(x => !!x),
    //     switchMap(searchedKeyword => this._store
    //       .select(s => s.home.getHotelPrices[searchedKeyword as string]?.USD?.data)
    //       .pipe(untilDestroyed(this))
    //     )
    //   )

    // Dispatch GetHotelPrices when received new data from SearchHotelSuccess
    this._actions
      .pipe(
        ofType<SearchHotelSuccess>(HomeActionTypes.SearchHotelSuccess),
        untilDestroyed(this)
      )
      .subscribe(action => {
        const { triggerAction } = action
        this._store.dispatch(new GetHotelPrices([triggerAction.payload[0], 'USD']))
      })
  }
}
