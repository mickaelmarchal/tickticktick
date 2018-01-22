import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs/observable/empty';
import { cold, hot } from 'jasmine-marbles';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { Timer } from '../models/timer';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';

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

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: TestActions;

  const timer1 = { id: '111', volumeInfo: {} } as Timer;
  const timer2 = { id: '222', volumeInfo: {} } as Timer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: Database,
          useValue: {
            open: jest.fn(),
            query: jest.fn(),
            insert: jest.fn(),
            executeWrite: jest.fn()
          }
        },
        { provide: Actions, useFactory: getActions }
      ]
    });

    db = TestBed.get(Database);
    effects = TestBed.get(CollectionEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      effects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('tickticktick');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the timers, on success', () => {
      const action = new collection.Load();
      const completion = new collection.LoadSuccess([timer1, timer2]);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a-b|', { a: timer1, b: timer2 });
      const expected = cold('-----c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = new collection.Load();
      const error = 'Error!';
      const completion = new collection.LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addTimerToCollection$', () => {
    it('should return a collection.AddTimerSuccess, with the timer, on success', () => {
      const action = new collection.AddTimer(timer1);
      const completion = new collection.AddTimerSuccess(timer1);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addTimerToCollection$).toBeObservable(expected);
      expect(db.insert).toHaveBeenCalledWith('timers', [timer1]);
    });

    it('should return a collection.AddTimerFail, with the timer, when the db insert throws', () => {
      const action = new collection.AddTimer(timer1);
      const completion = new collection.AddTimerFail(timer1);
      const error = 'Error!';

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addTimerToCollection$).toBeObservable(expected);
    });

    describe('removeTimerFromCollection$', () => {
      it('should return a collection.RemoveTimerSuccess, with the timer, on success', () => {
        const action = new collection.RemoveTimer(timer1);
        const completion = new collection.RemoveTimerSuccess(timer1);

        actions$.stream = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeTimerFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('timers', 'delete', [
          timer1.id
        ]);
      });

      it('should return a collection.RemoveTimerFail, with the timer, when the db insert throws', () => {
        const action = new collection.RemoveTimer(timer1);
        const completion = new collection.RemoveTimerFail(timer1);
        const error = 'Error!';

        actions$.stream = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeTimerFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('timers', 'delete', [
          timer1.id
        ]);
      });
    });
  });
});
