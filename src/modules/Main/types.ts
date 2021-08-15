import { WorkoutObject, WorkoutDTO } from 'src/store/modules/types';
import { fetchWorkouts, createWorkout, removeWorkout, changePart, editWorkout } from 'src/store/modules/actions';
import { QueryObject } from 'src/api/utils/types';

export interface MainState {
  activeModal: boolean;
  operationType: string;

  peopleCount: number;
  trainPrice: number;
  workoutDate: string;

  shouldBeValidated: boolean;

  idsToRemove: string[];
  workouts: WorkoutObject[];
  editingWorkoutId: null | string;
}

export interface MainProps {
  workoutsArray: WorkoutObject[];
  currentPart: 'first' | 'second';
  currentMonth: number;
  currentYear: number;

  isLoading?: boolean;

  fetchWorkouts: () => void;
  createWorkout: (workoutData: WorkoutDTO) => void;
  removeWorkout: (workouts: QueryObject) => void;
  editWorkout: (workoutData: WorkoutDTO) => void;
  changePart: (date: Date) => void;
}
