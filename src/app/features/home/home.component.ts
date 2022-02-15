import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
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
      keyword: ['', [Validators.required]]
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

    this.searchHotelData$ = this._searchedKeyword
      .pipe(
        filter(x => !!x),
        switchMap(searchedKeyword => this._store
          .select(s => s.home.searchHotel[searchedKeyword as string]?.data)
          .pipe(untilDestroyed(this))
        )
      )

    this.getHotelPricesData$ = this._searchedKeyword
      .pipe(
        filter(x => !!x),
        switchMap(searchedKeyword => this._store
          .select(s => s.home.getHotelPrices[searchedKeyword as string]?.USD?.data)
          .pipe(untilDestroyed(this))
        )
      )

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
