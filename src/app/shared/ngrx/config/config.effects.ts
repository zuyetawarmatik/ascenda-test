import { Inject, Injectable } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { STORAGE_CONFIG_KEY } from 'app/shared/constants'
import { WINDOW } from 'app/shared/services/window.service'

import { RootState } from '../reducers'
import {
  ChangeCurrency, ConfigActionTypes, PersistConfig
} from './config.actions'

@UntilDestroy()
@Injectable()
export class ConfigEffects {
  private _storeConfigData$ = new BehaviorSubject<unknown>(null)
  get _storeConfigData(): unknown { return this._storeConfigData$.value }

  constructor(
    @Inject(WINDOW) private _window: Window,
    private _actions$: Actions,
    private _store: Store<RootState>
  ) {
    this._store
      .select(s => s.config)
      .pipe(untilDestroyed(this))
      .subscribe(this._storeConfigData$)
  }

  changeCurrency$ = createEffect(() => this._actions$.pipe(
    ofType<ChangeCurrency>(ConfigActionTypes.ChangeCurrency),
    map(() => new PersistConfig())
  ))

  persistConfig$ = createEffect(() => this._actions$.pipe(
    ofType<PersistConfig>(ConfigActionTypes.PersistConfig),
    tap(() => this._window.localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(this._storeConfigData)))
  ), { dispatch: false })
}
