import { InjectionToken, AbstractType, Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { stub } from 'sinon'

import { Callable } from 'app/shared/utils/types'

import { asyncData, asyncError } from './general.testUtils'

type ResultType = 'success' | 'failure' | 'half failure' | 'progress'

const stubError = new HttpErrorResponse({
  error: 'Stub Error',
  status: 404,
  statusText: 'Not Found'
})

function generateItDesc(httpMethod: string, testedPath: string, serviceFnKey: string, resultType: ResultType) {
  return `should call ${httpMethod.toUpperCase()} ${testedPath} when ${serviceFnKey}() and return ${resultType}`
}

export function testServiceHttpFn<Key extends string, Service extends { [k in Key]: Callable<Observable<any>> }>({
  service,
  serviceFnKey,
  serviceFnParams = [],
  providers = [],
  httpMethod,
  testedPath,
  testedHttpParams = []
}: {
  service: Type<Service> | InjectionToken<Service> | AbstractType<Service>,
  serviceFnKey: Key,
  serviceFnParams?: unknown[],
  providers?: unknown[],
  httpMethod: string,
  testedPath: string,
  testedHttpParams?: unknown[]
}): void {
  describe(serviceFnKey, () => {
    const stubData = [1, 2, 3]

    function runTest(
      resultType: ResultType,
      done: DoneFn
    ) {
      const returnedObservable = resultType === 'success'
        ? asyncData(stubData)
        : asyncError(stubError)
      const stubHttpMethod = stub().returns(returnedObservable)

      TestBed.configureTestingModule({
        providers: [
          { provide: HttpClient, useValue: { [httpMethod]: stubHttpMethod } },
          service,
          ...providers
        ]
      })

      const injService = TestBed.inject(service)

      if (resultType === 'success') {
        injService[serviceFnKey](...serviceFnParams).subscribe(
          value => {
            expect(value).toEqual(stubData)
            expect(stubHttpMethod.lastCall.args).toEqual([testedPath, ...testedHttpParams])
            done()
          },
          fail
        )
      } else {
        injService[serviceFnKey](...serviceFnParams).subscribe(
          fail,
          value => {
            expect(value).toEqual(stubError)
            expect(stubHttpMethod.lastCall.args).toEqual([testedPath, ...testedHttpParams])
            done()
          }
        )
      }
    }

    (['success', 'failure'] as const).forEach(resultType => {
      it(generateItDesc(httpMethod, testedPath, serviceFnKey, resultType), (done: DoneFn) => {
        runTest(resultType, done)
      })
    })
  })
}
