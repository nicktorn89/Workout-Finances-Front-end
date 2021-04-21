import { actionFactory } from '@gostgroup/redux-modus';
import { Service } from 'src/api/';
import { QueryObject, Data } from 'src/api/utils/types';

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
  (workoutData) => {
    return Service
      .path('/workouts')
      .post(workoutData as Data);
  },
);

export const editWorkout = createAction(
  'editWorkout',
  (workoutData) => {
    return Service
      .path('/workouts')
      .put(workoutData as Data);
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
  (isIncrement: boolean) => {
    return { isIncrement };
  },
);
