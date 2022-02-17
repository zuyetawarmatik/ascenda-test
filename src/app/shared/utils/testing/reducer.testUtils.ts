import get from 'lodash-es/get'

import { ReadState, TriggerAction, ResultAction, WriteState } from 'app/shared/utils/ngrx'
import { Callable, Constructor } from 'app/shared/utils/types'

const progressPayload = { progress: 50 }
const successPayload = { status: 'success' }
const errorPayload = { status: 'error' }

export function testReadReducer<Key extends string, State extends { [k in Key]: ReadState | { [subKey: string]: ReadState } }>({
  reducer,
  initialState,
  stateKey,
  stateSubKey = '',
  triggerActionConstructor,
  triggerActionConstructorParams = [{}],
  successActionConstructor,
  failureActionConstructor,
  progressActionConstructor
}: {
  reducer: Callable<State>,
  initialState: State,
  stateKey: Key,
  stateSubKey?: string,
  triggerActionConstructor: Constructor<TriggerAction>,
  triggerActionConstructorParams?: unknown[],
  successActionConstructor: Constructor<ResultAction<TriggerAction>>,
  failureActionConstructor: Constructor<ResultAction<TriggerAction>>,
  progressActionConstructor?: Constructor<ResultAction<TriggerAction, any, { progress: number }>>
}): void {
  const key = stateSubKey ? `${stateKey}.${stateSubKey}` : stateKey
  const triggerAction = new triggerActionConstructor(...triggerActionConstructorParams)

  it('should return correctly new state', () => {
    const nextState = reducer(initialState, triggerAction)

    expect(get(nextState, key)).toEqual({
      ...get(initialState, key),
      isProcessing: true,
      progress: 0,
      error: null
    })

    if (progressActionConstructor) {
      expect(get(reducer(nextState, new progressActionConstructor(triggerAction, progressPayload)), key)).toEqual({
        ...get(nextState, key),
        progress: progressPayload.progress
      })
    }

    expect(get(reducer(nextState, new successActionConstructor(triggerAction, successPayload)), key)).toEqual({
      ...get(nextState, key),
      isProcessing: false,
      data: successPayload
    })

    expect(get(reducer(nextState, new failureActionConstructor(triggerAction, errorPayload)), key)).toEqual({
      ...get(nextState, key),
      isProcessing: false,
      data: null,
      error: errorPayload
    })
  })
}

export function testWriteReducer<Key extends string, State extends { [k in Key]: WriteState | { [subKey: string]: WriteState } }>({
  reducer,
  initialState,
  stateKey,
  stateSubKey = '',
  triggerActionConstructor,
  triggerActionConstructorParams = [{}],
  successActionConstructor,
  failureActionConstructor,
  progressActionConstructor
}: {
  reducer: Callable<State>,
  initialState: State,
  stateKey: Key,
  stateSubKey?: string,
  triggerActionConstructor: Constructor<TriggerAction>,
  triggerActionConstructorParams?: unknown[],
  successActionConstructor: Constructor<ResultAction<TriggerAction>>,
  failureActionConstructor: Constructor<ResultAction<TriggerAction>>,
  progressActionConstructor?: Constructor<ResultAction<TriggerAction, any, { progress: number }>>
}): void {
  const key = stateSubKey ? `${stateKey}.${stateSubKey}` : stateKey
  const triggerAction = new triggerActionConstructor(...triggerActionConstructorParams)

  it('should return correctly new state', () => {
    const nextState = reducer(initialState, triggerAction)

    expect(get(nextState, key)).toEqual({
      ...get(nextState, key),
      isProcessing: true,
      progress: 0,
      error: null
    })

    if (progressActionConstructor) {
      expect(get(reducer(nextState, new progressActionConstructor(triggerAction, progressPayload)), key)).toEqual({
        ...get(nextState, key),
        progress: progressPayload.progress
      })
    }

    expect(get(reducer(nextState, new successActionConstructor(triggerAction, successPayload)), key)).toEqual({
      ...get(nextState, key),
      isProcessing: false,
      data: successPayload
    })

    expect(get(reducer(nextState, new failureActionConstructor(triggerAction, errorPayload)), key)).toEqual({
      ...get(nextState, key),
      isProcessing: false,
      data: null,
      error: errorPayload
    })
  })
}

export function testNoopReducer<State>({
  reducer,
  initialState
}: {
  reducer: Callable<State>,
  initialState: State
}): void {
  it('should not change state', () => {
    const nextState = reducer(initialState, { type: `_RANDOM_${Math.floor(Math.random() * 1000)}_` })
    expect(nextState).toEqual(initialState)
  })
}
