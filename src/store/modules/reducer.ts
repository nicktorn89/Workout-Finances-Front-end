import { createReducer } from '@gostgroup/redux-modus';

import { MainStore, WorkoutObject } from './types';
import { fetchWorkouts, createWorkout, removeWorkout, changePart, editWorkout } from './actions';
import { onFetching, onError, onSuccess } from 'src/store/utils';
import moment from 'moment';
import { divideMonth, changeMonthPart } from 'src/modules/Main/utils';

const initialState: MainStore = {
  workouts: [],
  currentYear: moment().year(),
  currentMonth: moment().month(),
  currentPart: moment().date() <= 15
    ? 'first'
    : 'second',
};

export const reducer = createReducer(initialState);

reducer
  .on(
    (onFetching(fetchWorkouts)),
    (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
  ).on(
    (onSuccess(fetchWorkouts)),
    (state, payload) => {
      const { currentYear, currentMonth, currentPart } = state;

      const allWorkouts = {
        workoutsByTime: divideMonth((payload as WorkoutObject[])),
      };

      const currentWorkouts = allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart];
      const workouts = currentWorkouts.map(({ price, peopleCount, ...rest }) => ({
        ...rest,
        price,
        peopleCount,
        trainPrice: Math.round(price / peopleCount),
      }));

      return {
        ...state,
        ...allWorkouts,
        workouts,
        isLoading: false,
        isLoaded: true,
      };
    },
  ).on(
    (onError(fetchWorkouts)),
    (state) => ({
      ...state,
      isLoading: true,
      error: 'Ошибка при загрузке тренировок',
    }),
  ).on(
    (onFetching(createWorkout)),
    (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
  ).on(
    (onSuccess(createWorkout)),
    (state, payload) => {
      const { currentYear, currentMonth, currentPart } = initialState;

      const allWorkouts = {
        workoutsByTime: divideMonth((payload as WorkoutObject[])),
      };
      const currentWorkouts = { workouts: allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart] };

      return {
        ...state,
        ...currentWorkouts,
        ...allWorkouts,
        currentYear,
        currentMonth,
        currentPart,
        isLoading: false,
        isLoaded: true,
      };
    },
  ).on(
    (onError(createWorkout)),
    (state) => ({
      ...state,
      isLoading: true,
      error: 'Ошибка при создании тренировки',
    }),
  ).on(
    (onSuccess(editWorkout)),
    (state, payload) => {
      const { currentYear, currentMonth, currentPart } = initialState;

      const allWorkouts = {
        workoutsByTime: divideMonth((payload as WorkoutObject[])),
      };
      const currentWorkouts = { workouts: allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart] };

      return {
        ...state,
        ...currentWorkouts,
        ...allWorkouts,
        currentYear,
        currentMonth,
        currentPart,
        isLoading: false,
        isLoaded: true,
      };
    },
  ).on(
    (onError(editWorkout)),
    (state) => ({
      ...state,
      isLoading: true,
      error: 'Ошибка при создании тренировки',
    }),
  ).on(
    (onFetching(editWorkout)),
    (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
  ).on(
    (onSuccess(removeWorkout)),
    (state, payload) => {
      const { currentYear, currentMonth, currentPart } = state;
      const allWorkouts = {
        workoutsByTime: divideMonth((payload as WorkoutObject[])),
      };
      const currentWorkouts = { workouts: allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart] };

      return {
        ...state,
        ...currentWorkouts,
        ...allWorkouts,
        isLoading: false,
        isLoaded: true,
      };
    },
  ).on(
    (onError(removeWorkout)),
    (state) => ({
      ...state,
      isLoading: true,
      error: 'Ошибка при удалении тренировки',
    }),
  ).on(changePart,
    (state, payload) => {
      const { workoutsByTime } = state;
      const { date } = payload;

      console.log('date in action', date);

      const currentPart = date.getDate() > 15 ? 'second' : 'first';
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();

      const newState: {
        currentPart: 'first' | 'second';
        currentMonth: number;
        currentYear: number;
      } = {
        currentPart,
        currentMonth,
        currentYear,
      };

      const newWorkouts = (() => {
        if (workoutsByTime
          && workoutsByTime[currentYear]
          && workoutsByTime[currentYear][currentMonth]
          && workoutsByTime[currentYear][currentMonth][currentPart]
        ) {
          return workoutsByTime[currentYear][currentMonth][currentPart];
        }
        
        return [];
      })();

      return {
        ...state,
        ...newState,
        workouts: newWorkouts,
        ...payload,
      };
    });

export default reducer;
