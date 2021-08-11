import { MainStore } from './types';
import moment from 'moment';
import actionTypes from './actionTypes';

const initialState: MainStore = {
  workouts: [],
  currentYear: moment().year(),
  currentMonth: moment().month(),
  currentPart: moment().date() <= 15
    ? 'first'
    : 'second',
};

export const reducer = (state = initialState, action: { type: string; payload?: any, error?: any }) => {
  switch (action.type) {
    case actionTypes.FETCH_WORKOUTS_START: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }

    case actionTypes.FETCH_WORKOUTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }

    case actionTypes.FETCH_WORKOUTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,

        error: action.error,
      };
    }

    case actionTypes.SET_WORKOUTS_BY_TIME: {
      const { workoutsByTime } = action.payload;

      return {
        ...state,
        workoutsByTime,
      };
    }

    case actionTypes.SET_WORKOUTS: {
      const { workouts } = action.payload;

      return {
        ...state,
        workouts,
      };
    }

    case actionTypes.SET_PERIOD: {
      const { currentMonth, currentYear, currentPart } = action.payload;

      return {
        ...state,
        currentMonth,
        currentYear,
        currentPart,
      };
    }

    default:
      return state;
  }
};
