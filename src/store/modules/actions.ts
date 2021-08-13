import { Service } from 'src/api/';
import { QueryObject } from 'src/api/utils/types';
import { WorkoutDTO, MainStore, WorkoutObject, PeriodData } from './types';
import actionTypes from './actionTypes';
import { ThunkDispatch } from 'redux-thunk';
import { getDateFromPeriod } from './getDateFromPeriod';

const setWorkouts = (workouts: WorkoutObject[]) => ({
  type: actionTypes.SET_WORKOUTS,
  payload: {
    workouts,
  },
});

export const fetchWorkouts = () =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; error?: any; }>, getState: () => MainStore) => {
    const { currentYear, currentMonth, currentPart } = getState();

    dispatch({
      type: actionTypes.FETCH_WORKOUTS_START,
    });

    try {
      const fetchedWorkouts = await Service
        .path('/workouts')
        .get({ periodDate: JSON.stringify(getDateFromPeriod(currentYear, currentMonth, currentPart)) });

      dispatch(setWorkouts(fetchedWorkouts));

      dispatch({
        type: actionTypes.FETCH_WORKOUTS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        error,
        type: actionTypes.FETCH_WORKOUTS_FAILURE,
      });
    }
  };

export const createWorkout = (workoutData: WorkoutDTO) =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
    const { currentYear, currentMonth, currentPart } = getState();

    const workoutDataWithPeriod = {
      ...workoutData,
      periodDate: JSON.stringify(getDateFromPeriod(currentYear, currentMonth, currentPart)),
    };

    const updatedWorkouts = await Service
      .path('/workouts')
      .post(workoutDataWithPeriod);

    dispatch(setWorkouts(updatedWorkouts));
  };

export const editWorkout = (workoutData: WorkoutDTO) =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
    const { currentYear, currentMonth, currentPart } = getState();

    const workoutDataWithPeriod = {
      ...workoutData,
      periodDate: JSON.stringify(getDateFromPeriod(currentYear, currentMonth, currentPart)),
    };

    const updatedWorkouts = await Service
      .path('/workouts')
      .put(workoutDataWithPeriod);

    dispatch(setWorkouts(updatedWorkouts));
  };

export const removeWorkout = (workouts: QueryObject) =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
    const { currentYear, currentMonth, currentPart } = getState();

    const workoutDataWithPeriod = {
      ...workouts,
      periodDate: JSON.stringify(getDateFromPeriod(currentYear, currentMonth, currentPart)),
    };

    const updatedWorkouts = await Service
      .path('/workouts/remove')
      .post(workoutDataWithPeriod);

    dispatch(setWorkouts(updatedWorkouts));
  };

export const setPeriod = (periodData: PeriodData) => ({
  type: actionTypes.SET_PERIOD,
  payload: periodData,
});

export const changePart = (date: Date) => (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>) => {
  const currentPart = date.getDate() > 15 ? 'second' : 'first';
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  dispatch(setPeriod({ currentPart, currentMonth, currentYear }));

  dispatch(fetchWorkouts());
};
