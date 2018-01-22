import { Action } from '@ngrx/store';
import { Timer } from '../models/timer';

export const ADD_TIMER = '[Collection] Add Timer';
export const ADD_TIMER_SUCCESS = '[Collection] Add Timer Success';
export const ADD_TIMER_FAIL = '[Collection] Add Timer Fail';
export const REMOVE_TIMER = '[Collection] Remove Timer';
export const REMOVE_TIMER_SUCCESS = '[Collection] Remove Timer Success';
export const REMOVE_TIMER_FAIL = '[Collection] Remove Timer Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

/**
 * Add Timer to Collection Actions
 */
export class AddTimer implements Action {
  readonly type = ADD_TIMER;

  constructor(public payload: Timer) {}
}

export class AddTimerSuccess implements Action {
  readonly type = ADD_TIMER_SUCCESS;

  constructor(public payload: Timer) {}
}

export class AddTimerFail implements Action {
  readonly type = ADD_TIMER_FAIL;

  constructor(public payload: Timer) {}
}

/**
 * Remove Timer from Collection Actions
 */
export class RemoveTimer implements Action {
  readonly type = REMOVE_TIMER;

  constructor(public payload: Timer) {}
}

export class RemoveTimerSuccess implements Action {
  readonly type = REMOVE_TIMER_SUCCESS;

  constructor(public payload: Timer) {}
}

export class RemoveTimerFail implements Action {
  readonly type = REMOVE_TIMER_FAIL;

  constructor(public payload: Timer) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Timer[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddTimer
  | AddTimerSuccess
  | AddTimerFail
  | RemoveTimer
  | RemoveTimerSuccess
  | RemoveTimerFail
  | Load
  | LoadSuccess
  | LoadFail;
