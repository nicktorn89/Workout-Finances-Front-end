import { WorkoutObject } from 'src/store/modules/types';
import { fetchWorkouts, createWorkout, removeWorkout, changePart } from 'src/store/modules/actions';

export interface MainState {
  activeModal: boolean;
  peopleCount: number;
  isFree: boolean;
  isJumps: boolean;
  isPersonal: boolean;
  indexesToRemove: number[];
  workouts?: WorkoutObject[];
  [name: string]: boolean | number | number[] | WorkoutObject[] | undefined;
}

export interface MainProps {
  workoutsArray?: WorkoutObject[];
  currentPart?: 'first' | 'second';
  currentMonth?: number;
  currentYear?: number;
  fetchWorkouts?: typeof fetchWorkouts;
  createWorkout?: typeof createWorkout;
  removeWorkout?: typeof removeWorkout;
  changePart?: typeof changePart;
}

export interface TimeObject {
  [key: number]: {
    [key: number]: { 
      first: WorkoutObject[];
      second: WorkoutObject[];
    };
  };
}

export type ChangedMonth = {
  currentPart: 'first' | 'second',
  currentMonth: number;
  currentYear: number;
};
