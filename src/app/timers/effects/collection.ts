import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Timer } from '../models/timer';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('tickticktick');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .switchMap(() =>
      this.db
        .query('timers')
        .toArray()
        .map((timers: Timer[]) => new collection.LoadSuccess(timers))
        .catch(error => of(new collection.LoadFail(error)))
    );

  @Effect()
  addTimerToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_TIMER)
    .map((action: collection.AddTimer) => action.payload)
    .mergeMap(timer =>
      this.db
        .insert('timers', [timer])
        .map(() => new collection.AddTimerSuccess(timer))
        .catch(() => of(new collection.AddTimerFail(timer)))
    );

  @Effect()
  removeTimerFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_TIMER)
    .map((action: collection.RemoveTimer) => action.payload)
    .mergeMap(timer =>
      this.db
        .executeWrite('timers', 'delete', [timer.id])
        .map(() => new collection.RemoveTimerSuccess(timer))
        .catch(() => of(new collection.RemoveTimerFail(timer)))
    );

  constructor(private actions$: Actions, private db: Database) {}
}
