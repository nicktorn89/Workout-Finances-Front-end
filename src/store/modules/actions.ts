import { Service } from 'src/api/';
import { QueryObject } from 'src/api/utils/types';
import { WorkoutDTO, MainStore, WorkoutObject, PeriodData } from './types';
import actionTypes from './actionTypes';
import { divideMonth } from 'src/modules/Main/utils';
import { ThunkDispatch } from 'redux-thunk';
import { TimeObject } from 'src/modules/Main/types';

const setWorkouts = (workouts: WorkoutObject[]) => ({
  type: actionTypes.SET_WORKOUTS,
  payload: {
    workouts,
  },
});

const setAllWorkouts = (workoutsByTime: TimeObject) => ({
  type: actionTypes.SET_WORKOUTS_BY_TIME,
  payload: {
    workoutsByTime,
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
        .get();

      const allWorkouts = {
        workoutsByTime: divideMonth((fetchedWorkouts as WorkoutObject[])),
      };

      const currentWorkouts = allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart];
      const workouts = currentWorkouts.map(({ price, peopleCount, ...rest }) => ({
        ...rest,
        price,
        peopleCount,
        trainPrice: Math.round(price / peopleCount),
      }));

      dispatch(setAllWorkouts(allWorkouts.workoutsByTime));
      dispatch(setWorkouts(workouts));

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
    const updatedWorkouts = await Service
      .path('/workouts')
      .post(workoutData);

    const { currentYear, currentMonth, currentPart } = getState();

    const allWorkouts = {
      workoutsByTime: divideMonth((updatedWorkouts as WorkoutObject[])),
    };

    dispatch(setAllWorkouts(allWorkouts.workoutsByTime));
    dispatch(setWorkouts(allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart]));
  };

export const editWorkout = (workoutData: WorkoutDTO) =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
    const updatedWorkouts = await Service
      .path('/workouts')
      .put(workoutData);

    const { currentYear, currentMonth, currentPart } = getState();

    const allWorkouts = {
      workoutsByTime: divideMonth((updatedWorkouts as WorkoutObject[])),
    };

    dispatch(setAllWorkouts(allWorkouts.workoutsByTime));
    dispatch(setWorkouts(allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart]));
  };

export const removeWorkout = (workouts: QueryObject) =>
  async (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
    const updatedWorkouts = await Service
      .path('/workouts/remove')
      .post(workouts);

    const { currentYear, currentMonth, currentPart } = getState();

    const allWorkouts = {
      workoutsByTime: divideMonth((updatedWorkouts as WorkoutObject[])),
    };

    dispatch(setAllWorkouts(allWorkouts.workoutsByTime));
    dispatch(setWorkouts(allWorkouts.workoutsByTime[currentYear][currentMonth][currentPart]));
  };

export const setPeriod = (periodData: PeriodData) => ({
  type: actionTypes.SET_PERIOD,
  payload: periodData,
});

export const changePart = (date: Date) => (dispatch: ThunkDispatch<MainStore, {}, { type: string; }>, getState: () => MainStore) => {
  const { workoutsByTime } = getState();

  const currentPart = date.getDate() > 15 ? 'second' : 'first';
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

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

  dispatch(setPeriod({ currentPart, currentMonth, currentYear }));
  dispatch(setWorkouts(newWorkouts));
};
