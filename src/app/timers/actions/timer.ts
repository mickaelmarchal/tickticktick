import { Action } from '@ngrx/store';
import { Timer } from '../models/timer';

export const SEARCH = '[Timer] Search';
export const SEARCH_COMPLETE = '[Timer] Search Complete';
export const SEARCH_ERROR = '[Timer] Search Error';
export const LOAD = '[Timer] Load';
export const SELECT = '[Timer] Select';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Timer[]) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Timer) {}
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = Search | SearchComplete | SearchError | Load | Select;
