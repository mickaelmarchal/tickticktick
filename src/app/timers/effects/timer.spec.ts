import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { TimerEffects, SEARCH_SCHEDULER, SEARCH_DEBOUNCE } from './timer';
import { GoogleTimersService } from '../../core/services/google-timers';
import { Observable } from 'rxjs/Observable';
import { Search, SearchComplete, SearchError } from '../actions/timer';
import { Timer } from '../models/timer';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('TimerEffects', () => {
  let effects: TimerEffects;
  let googleTimersService: any;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerEffects,
        {
          provide: GoogleTimersService,
          useValue: { searchTimers: jest.fn() }
        },
        { provide: Actions, useFactory: getActions },
        { provide: SEARCH_SCHEDULER, useFactory: getTestScheduler },
        { provide: SEARCH_DEBOUNCE, useValue: 30 }
      ]
    });

    effects = TestBed.get(TimerEffects);
    googleTimersService = TestBed.get(GoogleTimersService);
    actions$ = TestBed.get(Actions);
  });

  describe('search$', () => {
    it('should return a new timer.SearchComplete, with the timers, on success, after the de-bounce', () => {
      const timer1 = { id: '111', volumeInfo: {} } as Timer;
      const timer2 = { id: '222', volumeInfo: {} } as Timer;
      const timers = [timer1, timer2];
      const action = new Search('query');
      const completion = new SearchComplete(timers);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: timers });
      const expected = cold('-----b', { b: completion });
      googleTimersService.searchTimers = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a new timer.SearchError if the timers service throws', () => {
      const action = new Search('query');
      const completion = new SearchError('Unexpected Error. Try again later.');
      const error = 'Unexpected Error. Try again later.';

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      googleTimersService.searchTimers = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = new Search('');

      actions$.stream = hot('-a---', { a: action });
      const expected = cold('---');

      expect(effects.search$).toBeObservable(expected);
    });
  });
});
