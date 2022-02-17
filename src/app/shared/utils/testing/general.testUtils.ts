import { ComponentFixture } from '@angular/core/testing'
import { MockStore } from '@ngrx/store/testing'
import { defer, Observable, Subject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data))
}

export function asyncError(err: unknown): Observable<unknown> {
  return defer(() => Promise.reject(err))
}

export function createTestScheduler(): TestScheduler {
  return new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })
}

export function updateStoreAndFixture(store: MockStore, state: any, fixture: ComponentFixture<unknown>): void {
  store.setState(state)
  fixture.detectChanges()
}

export function updateSubjectAndFixture<T = any>(subject: Subject<T>, value: T, fixture: ComponentFixture<unknown>): void {
  subject.next(value)
  fixture.detectChanges()
}
