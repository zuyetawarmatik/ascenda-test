import { Action } from '@ngrx/store'

export interface PayloadAction<PayloadType = any> extends Action {
  payload?: PayloadType;
}

export type TriggerAction<PayloadType = any> = PayloadAction<PayloadType>

export interface ResultAction<T extends TriggerAction<TriggerPayloadType> = any, TriggerPayloadType = any, ResultPayloadType = any> extends PayloadAction<ResultPayloadType> {
  triggerAction?: T;
}
