import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Timer } from '../models/timer';
import * as timer from '../actions/timer';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Timer> {
  selectedTimerId: string | null;
  loaded: boolean;
  loading: boolean;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Timer> = createEntityAdapter<Timer>({
  selectId: (selectTimer: Timer) => selectTimer.id,
  sortComparer: (a: Timer, b: Timer) => a.order - b.order
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedTimerId: null,
  loaded: false,
  loading: false
});

export function reducer(state = initialState, action: timer.Actions): State {
  switch (action.type) {
    case timer.LOAD_SUCCESS: {
      return {
        /**
         * The addMany function provided by the created adapter
         * adds many records to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.addMany(action.payload, state),
        selectedTimerId: state.selectedTimerId,
        loaded: true,
        loading: false
      };
    }

    case timer.ADD_SUCCESS:
    case timer.REMOVE_FAIL: {
      return {
        ...adapter.addOne(action.payload, state)
      };
    }

    case timer.REMOVE_SUCCESS:
    case timer.ADD_FAIL: {
      return {
        ...adapter.removeOne(action.payload.id, state)
      };
    }

    case timer.UPDATE_SUCCESS: {
      return {
        ...adapter.updateOne(action.payload, state)
      };
    }

    case timer.UPDATEMULTI_SUCCESS: {
      return {
        ...adapter.updateMany(action.payload.changes, state)
      };
    }

    case timer.LOAD: {
      return {
        /**
         * The addOne function provided by the created adapter
         * adds one record to the entity dictionary
         * and returns a new state including that records if it doesn't
         * exist already. If the collection is to be sorted, the adapter will
         * insert the new record into the sorted array.
         */
        ...state,
        loading: true,
        selectedTimerId: state.selectedTimerId
      };
    }

    case timer.SELECT: {
      return {
        ...state,
        selectedTimerId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedTimerId;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
