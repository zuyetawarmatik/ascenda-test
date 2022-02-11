import { Nullable } from 'app/shared/utils/types'

export interface WriteState<DataType = any, ErrorType = any> {
  isProcessing: boolean;
  progress: number;
  data: Nullable<DataType>;
  error: Nullable<ErrorType>;
}

export interface ReadState<DataType = any, ErrorType = any, FiltersType = any> extends WriteState<DataType, ErrorType> {
  isPolling: boolean;
  filterParams: Partial<Nullable<FiltersType>>;
}

export type SimpleReadState<DataType = any> = Pick<WriteState<DataType>, 'data'>

export const INITIAL_READ_STATE: ReadState = {
  isProcessing: false,
  isPolling: false,
  progress: 0,
  data: null,
  error: null,
  filterParams: {}
}

export const INITIAL_WRITE_STATE: WriteState = {
  isProcessing: false,
  progress: 0,
  data: null,
  error: null
}
