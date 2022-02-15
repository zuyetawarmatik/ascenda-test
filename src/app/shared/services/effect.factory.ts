import { Injectable } from '@angular/core'
import { HttpEventType } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import {
  switchMap, mergeMap, map, filter, takeUntil, catchError
} from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects'

import { Constructor } from 'app/shared/utils/types'
import { TriggerAction, ResultAction } from 'app/shared/utils/ngrx'

const EMPTY_ACTION_TYPE = ''

@Injectable({ providedIn: 'root' })
export class EffectFactory {
  constructor(private _actions$: Actions) { }

  // NOTE: This is used for normal interaction with server, such as GET, POST.
  // A Trigger will result in either a Success or a Failure.
  createDispatch<
    Trigger extends TriggerAction,
    Success extends ResultAction<Trigger>,
    Failure extends ResultAction<Trigger>
  >(
    {
      triggerActionType, interruptActionType = EMPTY_ACTION_TYPE,
      successActionConstructor, failureActionConstructor,
      isSimultaneous = false, serviceCallback
    }: {
      triggerActionType: string;
      interruptActionType?: string;
      successActionConstructor: Constructor<Success>;
      failureActionConstructor: Constructor<Failure>;
      isSimultaneous?: boolean;
      serviceCallback: (action: Trigger) => Observable<unknown>;
    }
  ): Observable<Action> & CreateEffectMetadata {
    // tslint:disable-next-line: deprecation
    const innerObservableMap = isSimultaneous ? mergeMap : switchMap

    return createEffect(() => this._actions$.pipe(
      ofType<Trigger>(triggerActionType),
      innerObservableMap((action: Trigger) =>
        serviceCallback(action).pipe(
          filter((response: any) => {
            const eventType = response?.__eventType__
            return eventType === null || eventType === undefined || eventType === HttpEventType.UploadProgress
          }),
          map(response => new successActionConstructor(action, response)),
          catchError(error => of(new failureActionConstructor(action, error))),
          takeUntil(this._actions$.pipe(ofType(interruptActionType)))
        )
      )
    ) as Observable<Action>)
  }
}
