import { reducer } from './timers';
import * as fromTimers from './timers';
import { SearchComplete, Load, Select } from '../actions/timer';
import { Timer, generateMockTimer } from '../models/timer';
import { LoadSuccess } from '../actions/collection';

describe('TimersReducer', () => {
  const timer1 = generateMockTimer();
  const timer2 = { ...timer1, id: '222' };
  const timer3 = { ...timer1, id: '333' };
  const initialState: fromTimers.State = {
    ids: [timer1.id, timer2.id],
    entities: {
      [timer1.id]: timer1,
      [timer2.id]: timer2
    },
    selectedTimerId: null
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingTimers(
      action: any,
      timersInitialState: any,
      initialState: any,
      timers: Timer[]
    ) {
      const createAction = new action(timers);

      const result = reducer(timersInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingTimers(action: any, initialState: any, timers: Timer[]) {
      // should not replace existing timers
      const differentTimer2 = { ...timers[0], foo: 'bar' };
      const createAction = new action([timers[1], differentTimer2]);

      const expectedResult = {
        ids: [...initialState.ids, timers[1].id],
        entities: {
          ...initialState.entities,
          [timers[1].id]: timers[1]
        },
        selectedTimerId: null
      };

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all timers in the payload when none exist', () => {
      noExistingTimers(SearchComplete, fromTimers.initialState, initialState, [
        timer1,
        timer2
      ]);

      noExistingTimers(LoadSuccess, fromTimers.initialState, initialState, [
        timer1,
        timer2
      ]);
    });

    it('should add only new timers when timers already exist', () => {
      existingTimers(SearchComplete, initialState, [timer2, timer3]);

      existingTimers(LoadSuccess, initialState, [timer2, timer3]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [timer1.id],
      entities: {
        [timer1.id]: timer1
      },
      selectedTimerId: null
    };

    it('should add a single timer, if the timer does not exist', () => {
      const action = new Load(timer1);

      const result = reducer(fromTimers.initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the timer exists', () => {
      const action = new Load(timer1);

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected timer id on the state', () => {
      const action = new Select(timer1.id);

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = fromTimers.getSelectedId({
          ...initialState,
          selectedTimerId: timer1.id
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
