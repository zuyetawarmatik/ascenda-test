import isEmpty from 'lodash-es/isEmpty'
import omitBy from 'lodash-es/omitBy'

import { ReadState, WriteState, INITIAL_READ_STATE, INITIAL_WRITE_STATE } from './state.utils'
import { PayloadAction } from './action.utils'

export function readReducer<D = any, E = any, F = any>(state: ReadState<D, E, F>): ReadState<D, E, F> {
  return {
    ...state,
    isProcessing: true,
    progress: INITIAL_READ_STATE.progress,
    error: INITIAL_READ_STATE.error
  }
}

export function readSuccessReducer<D = any, E = any, F = any>(state: ReadState<D, E, F>, action: PayloadAction<D>): ReadState<D, E, F> {
  return {
    ...state,
    isProcessing: false,
    data: action.payload
  }
}

export function readFailureReducer<D = any, E = any, F = any>(state: ReadState<D, E, F>, action: PayloadAction<E>): ReadState<D, E, F> {
  return {
    ...state,
    isProcessing: false,
    data: INITIAL_READ_STATE.data,
    error: action.payload
  }
}

export function readStartPollingReducer<D = any, E = any, F = any>(): ReadState<D, E, F> {
  return {
    ...INITIAL_READ_STATE,
    isPolling: true
  }
}

export function readStopPollingReducer<D = any, E = any, F = any>(state: ReadState<D, E, F>): ReadState<D, E, F> {
  return {
    ...state,
    isPolling: false
  }
}

export function readFilterReducer<D = any, E = any, F = any>(state: ReadState<D, E, F>, action: PayloadAction<F>): ReadState<D, E, F> {
  return {
    ...state,
    filterParams: omitBy({ ...state.filterParams, ...action.payload }, isEmpty) as F
  }
}

export function writeReducer<D = any, E = any>(state: WriteState<D, E>): WriteState<D, E> {
  return {
    ...state,
    isProcessing: true,
    progress: INITIAL_WRITE_STATE.progress,
    error: INITIAL_WRITE_STATE.error
  }
}

export function writeSuccessReducer<D = any, E = any>(state: WriteState<D, E>, action: PayloadAction<D>): WriteState<D, E> {
  return {
    ...state,
    isProcessing: false,
    data: action.payload
  }
}

export function writeFailureReducer<D = any, E = any>(state: WriteState<D, E>, action: PayloadAction<E>): WriteState<D, E> {
  return {
    ...state,
    isProcessing: false,
    data: INITIAL_WRITE_STATE.data,
    error: action.payload
  }
}
