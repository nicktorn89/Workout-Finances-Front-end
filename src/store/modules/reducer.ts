import { createReducer } from '@gostgroup/redux-modus';

import { MainStore, WorkoutObject } from './types';
import { fetchWorkouts, createWorkout, removeWorkout, changePart } from './actions';
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
        workoutsByTime: divideMonth((payload as { workouts: WorkoutObject[] }).workouts),
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
        workoutsByTime: divideMonth((payload as { workouts: WorkoutObject[] }).workouts),
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
    (onFetching(removeWorkout)),
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
        workoutsByTime: divideMonth((payload as { workouts: WorkoutObject[] }).workouts),
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
      const newState = changeMonthPart(state, payload.isIncrement);
      const newWorkouts = { workouts: workoutsByTime![newState.currentYear][newState.currentMonth][newState.currentPart] };
      return {
        ...state,
        ...newState,
        ...newWorkouts,
        ...payload,
      };
    });

export default reducer;
