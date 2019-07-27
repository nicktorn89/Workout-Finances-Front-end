import { TimeObject } from 'src/modules/Main/types';

export interface MainStore {
  workouts: WorkoutObject[];
  workoutsByTime?: TimeObject;
  currentYear: number;
  currentMonth: number;
  currentPart: 'first' | 'second';
}

export type WorkoutObject = {
  date: Date;
  people: number;
  price: number;
  isPersonal: boolean;
  isJumps: boolean;
  isFree: boolean;
  _id?: string;
};
