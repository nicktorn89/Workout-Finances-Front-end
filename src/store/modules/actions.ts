import { actionFactory } from '@gostgroup/redux-modus';
import { Service } from 'src/api/';
import { QueryObject } from 'src/api/utils/types';
import { WorkoutDTO } from './types';

const createAction = actionFactory('organization');

export const fetchWorkouts = createAction(
  'fetchWorkouts',
  () => {
    return Service
      .path('/workouts')
      .get();
  },
);

export const createWorkout = createAction(
  'createWorkout',
  (workoutData: WorkoutDTO) => {
    return Service
      .path('/workouts')
      .post(workoutData);
  },
);

export const editWorkout = createAction(
  'editWorkout',
  (workoutData: WorkoutDTO) => {
    return Service
      .path('/workouts')
      .put(workoutData);
  },
);

export const removeWorkout = createAction(
  'removeWorkout',
  (workouts: QueryObject) => {
    return Service
      .path('/workouts/remove')
      .post(workouts);
  },
);

export const changePart = createAction(
  'changePart',
  (date: Date) => {
    return { date };
  },
);
