import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { defer } from 'rxjs/observable/defer';
import { Router } from '@angular/router';

// import { GoogleTimersService } from '../../core/services/google-timers';
import * as timer from '../actions/timer';
import { Timer } from '../models/timer';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class TimerEffects {
  /*
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType<timer.Search>(timer.SEARCH)
    .debounceTime(this.debounce, this.scheduler || async)
    .map(action => action.payload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(timer.SEARCH).skip(1);

      return this.googleTimers
        .searchTimers(query)
        .takeUntil(nextSearch$)
        .map((timers: Timer[]) => new timer.SearchComplete(timers))
        .catch(err => of(new timer.SearchError(err)));
    });
   */

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

  /**
   * Load timers from IndexedDB
   */
  @Effect()
  load$: Observable<Action> = this.actions$.ofType(timer.LOAD).switchMap(() =>
    this.db
      .query('timers')
      .toArray()
      .map((timers: Timer[]) => {
        console.log('TIMER');
        console.log(timers);
        return new timer.LoadSuccess(timers);
      })
      .catch(error => of(new timer.LoadFail(error)))
  );

  /**
   * Add timer
   */
  @Effect()
  addTimer$: Observable<Action> = this.actions$
    .ofType(timer.ADD)
    .map((action: timer.Add) => action.payload)
    .mergeMap(newTimer =>
      this.db
        .insert('timers', [newTimer])
        .map(() => new timer.AddSuccess(newTimer))
        .catch(() => of(new timer.AddFail(newTimer)))
    );

  /**
   * Timer Add success
   */
  @Effect({ dispatch: false }) // dispatch false to allow the effect to return no action
  addTimerSuccess$ = this.actions$
    .ofType(timer.ADD_SUCCESS)
    // TODO refactor this to dispatch an action to the router.
    // see https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#effects
    .map(() => this.router.navigate(['/timers']));

  /**
   * Remove timer
   */
  @Effect()
  removeTimer$: Observable<Action> = this.actions$
    .ofType(timer.REMOVE)
    .map((action: timer.Remove) => action.payload)
    .mergeMap(removedTimer =>
      this.db
        .executeWrite('timers', 'delete', [removedTimer.id])
        .map(() => new timer.RemoveSuccess(removedTimer))
        .catch(() => of(new timer.RemoveFail(removedTimer)))
    );

  /**
   * Update timer
   */
  @Effect()
  updateTimer$: Observable<Action> = this.actions$
    .ofType(timer.UPDATE)
    .map((action: timer.Update) => action.payload)
    .mergeMap(updatedTimer =>
      this.db
        .executeWrite('timers', 'put', [updatedTimer.changes])
        .map(() => new timer.UpdateSuccess(updatedTimer))
        .catch(() => of(new timer.UpdateFail(updatedTimer)))
    );

  /**
   * Timer Update success
   */
  @Effect({ dispatch: false })
  updateTimerSuccess$ = this.actions$
    .ofType(timer.UPDATE_SUCCESS)
    // TODO refactor this to dispatch an action to the router.
    // see https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#effects
    .map(() => this.router.navigate(['/timers']));

  constructor(
    private actions$: Actions,
    // private googleTimers: GoogleTimersService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number = 300,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler,
    private db: Database,
    private router: Router
  ) {}
}
