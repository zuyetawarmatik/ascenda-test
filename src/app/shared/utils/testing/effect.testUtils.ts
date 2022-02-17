import { AbstractType, InjectionToken, Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { stub } from 'sinon'

import { EffectFactory } from 'app/shared/services/effect.factory'
import { ResultAction, TriggerAction } from 'app/shared/utils/ngrx'
import { Callable, Constructor } from 'app/shared/utils/types'

import { createTestScheduler } from './general.testUtils'

export function testDispatchEffect<
  EffectKey extends string,
  ServiceKey extends string,
  Effects extends { [k in EffectKey]: Observable<any> },
  Service extends { [k in ServiceKey]: Callable<Observable<any>> }
>({
  effects,
  effectKey,
  providers,
  imports = [],
  service,
  serviceFnKey,
  testedServiceParams = [],
  triggerActionConstructor,
  triggerActionConstructorParams = [{}],
  successActionConstructor,
  failureActionConstructor
}: {
  effects: Constructor<Effects>,
  effectKey: EffectKey,
  providers: unknown[]
  imports?: unknown[],
  service: Type<Service> | InjectionToken<Service> | AbstractType<Service>,
  serviceFnKey: ServiceKey,
  testedServiceParams?: unknown[],
  triggerActionConstructor: Constructor<TriggerAction | ResultAction>,
  triggerActionConstructorParams?: unknown[],
  successActionConstructor: Constructor<ResultAction<TriggerAction>>,
  failureActionConstructor: Constructor<ResultAction<TriggerAction>>,
}): void {
  describe(effectKey, () => {
    let testScheduler: TestScheduler
    let actions$: Actions
    let injEffects: Effects
    let injService: Service

    const stubData = [1, 2, 3]
    const stubError = new Error('Stub Error')

    beforeEach(() => {
      testScheduler = createTestScheduler()

      TestBed.configureTestingModule({
        imports,
        providers: [
          provideMockActions(() => actions$),
          {
            provide: EffectFactory,
            deps: [Actions]
          },
          effects,
          ...providers
        ]
      })

      injEffects = TestBed.inject(effects)
      injService = TestBed.inject(service)
    })

    it(`should call ${serviceFnKey}() when received ${triggerActionConstructor.name} action, and return ${successActionConstructor.name}`,
      () => {
        testScheduler.run(({ cold, hot, expectObservable, flush }) => {
          const triggerAction = new triggerActionConstructor(...triggerActionConstructorParams)
          const resultAction = new successActionConstructor(triggerAction, stubData)

          actions$ = hot('-a', { a: triggerAction })

          const stubServiceFn = stub().returns(cold('-b|', { b: stubData }))
          injService[serviceFnKey] = stubServiceFn as any

          expectObservable(injEffects[effectKey]).toBe('--c', { c: resultAction })

          flush()

          expect(stubServiceFn.lastCall.args).toEqual(testedServiceParams)
        })
      })

    it(`should call ${serviceFnKey}() when received ${triggerActionConstructor.name} action, and return ${failureActionConstructor.name}`,
      () => {
        testScheduler.run(({ cold, hot, expectObservable, flush }) => {
          const triggerAction = new triggerActionConstructor(...triggerActionConstructorParams)
          const resultAction = new failureActionConstructor(triggerAction, stubError)

          actions$ = hot('-a', { a: triggerAction })

          const stubServiceFn = stub().returns(cold('-#|', {}, stubError))
          injService[serviceFnKey] = stubServiceFn as any

          expectObservable(injEffects[effectKey]).toBe('--b', { b: resultAction })

          flush()

          expect(stubServiceFn.lastCall.args).toEqual(testedServiceParams)
        })
      })
  })
}

