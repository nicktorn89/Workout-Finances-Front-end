import { WorkoutObject } from 'src/store/modules/types';
import { fetchWorkouts, createWorkout, removeWorkout, changePart, editWorkout } from 'src/store/modules/actions';

export interface MainState {
  activeModal: boolean;
  operationType: string;

  peopleCount: number;
  trainPrice: number;

  indexesToRemove: number[];
  workouts: WorkoutObject[];
  editingWorkoutId: null | string;
}

export interface MainProps {
  workoutsArray: WorkoutObject[];
  currentPart?: 'first' | 'second';
  currentMonth?: number;
  currentYear?: number;

  fetchWorkouts?: typeof fetchWorkouts;
  createWorkout?: typeof createWorkout;
  removeWorkout?: typeof removeWorkout;
  editWorkout?: typeof editWorkout;
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
