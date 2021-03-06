import { Action } from '@ngrx/store';
import { Timer } from '../models/timer';

export const SEARCH = '[Timer] Search';
export const SEARCH_COMPLETE = '[Timer] Search Complete';
export const SEARCH_ERROR = '[Timer] Search Error';
export const LOAD = '[Timer] Load';
export const SELECT = '[Timer] Select';

export const ADD = '[Timer] Add';
export const ADD_SUCCESS = '[Timer] Add Success';
export const ADD_FAIL = '[Timer] Add Fail';
export const REMOVE = '[Timer] Remove';
export const REMOVE_SUCCESS = '[Timer] Remove Success';
export const REMOVE_FAIL = '[Timer] Remove Fail';
export const UPDATE = '[Timer] Update';
export const UPDATE_SUCCESS = '[Timer] Update Success';
export const UPDATE_FAIL = '[Timer] Update Fail';
export const UPDATEMULTI = '[Timer] UpdateMulti';
export const UPDATEMULTI_SUCCESS = '[Timer] UpdateMulti Success';
export const UPDATEMULTI_FAIL = '[Timer] UpdateMulti Fail';
export const LOAD_SUCCESS = '[Timer] Load Success';
export const LOAD_FAIL = '[Timer] Load Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Search Timer Actions
 */
export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}
export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Timer[]) { }
}
export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: string) { }
}

/**
 * Load Timers Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Timer[]) { }
}
export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

/**
 * Add Timer Actions
 */
export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Timer) { }
}
export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Timer) { }
}
export class AddFail implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: Timer) { }
}

/**
 * Remove Timer Actions
 */
export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public payload: Timer) { }
}
export class RemoveSuccess implements Action {
  readonly type = REMOVE_SUCCESS;

  constructor(public payload: Timer) { }
}
export class RemoveFail implements Action {
  readonly type = REMOVE_FAIL;

  constructor(public payload: Timer) { }
}

/**
 * Update Timer Actions
 */
export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: { id: string; changes: Timer }) { }
}
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: { id: string; changes: Timer }) { }
}
export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: { id: string; changes: Timer }) { }
}

/**
 * UpdateMulti Timer Actions
 */
export class UpdateMulti implements Action {
  readonly type = UPDATEMULTI;

  constructor(public payload: { changes: { id: string, changes: Timer }[] }) { }
}
export class UpdateMultiSuccess implements Action {
  readonly type = UPDATEMULTI_SUCCESS;

  constructor(public payload: { changes: { id: string, changes: Timer }[] }) { }
}
export class UpdateMultiFail implements Action {
  readonly type = UPDATEMULTI_FAIL;

  constructor(public payload: { changes: { id: string, changes: Timer }[] }) { }
}

/**
 * Select current timer Actions
 */
export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: string | null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | LoadSuccess
  | LoadFail
  | Add
  | AddSuccess
  | AddFail
  | Remove
  | RemoveSuccess
  | RemoveFail
  | Update
  | UpdateSuccess
  | UpdateFail
  | UpdateMulti
  | UpdateMultiSuccess
  | UpdateMultiFail
  | Select;
