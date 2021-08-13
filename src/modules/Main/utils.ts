import { WorkoutObject } from 'src/store/modules/types';

export const countWorkout = (peopleCount: number, trainPrice: number): number => Math.round(peopleCount * trainPrice);

export const createData = ({ date, peopleCount, price: salary, _id }: WorkoutObject) => {
  let id = 0;

  id += 1;

  return { id, date, peopleCount, salary, dataId: _id };
};

export const getIdFromIndexes = (indexes: number[], workouts: WorkoutObject[]): string[] => 
  [...indexes].map((index) => workouts[index]._id as string);

export const getWorkoutsPriceSum = (workouts: WorkoutObject[]): number => {
  if (!workouts || workouts.length === 0) return 0;

  return workouts
  .map(({ price }) => price)
  .reduce((sum, current): number => sum + current);
};
